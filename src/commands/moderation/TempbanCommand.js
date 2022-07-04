const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = class TempbanCommand extends BaseCommand {
  constructor() {
    super('tempban', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You do not have permission to use this command.');
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('I require \`BAN MEMBERS\` permission to tempban.');

    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.slice(2).join(" ");
    let time = args[1];
    const banEmbed = new Discord.MessageEmbed()
    .setTitle(`You have been banned in ${message.guild.name}`)
    .addField(`Reason: ${reason}`, `Duration: ${time}`)
    .setTimestamp();

    if (!args[0]) return message.channel.send('You must state a member to tempban \`.tempban @member time reason\`.');
    if (!mentionedMember) return message.channel.send('The member stated is not in the server.');
    if (!mentionedMember.bannable) return message.channel.send('This member is not banable.');
    if (mentionedMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('You cannot temp ban this member as there role is the sam or higher than yours.');
    if (!reason) reason = 'No reason givin'
    if (!time) return message.channel.send('You must state a time to tempban this member. example \`.tempban @members 7days reason\`');

    await mentionedMember.send(banEmbed).catch(err => console.log(err));
    await mentionedMember.ban({
      days: 7,
      reason: reason
    }).catch(err => console.error(err));

    setTimeout(async function () {
      await message.guild.fetchBans().then(async bans => {
        if (bans.size == 0) return message.channel.send('This guild does not have anybans.');
        let bannedUser = bans.find(b => b.user.id === mentionedMember.id)
        if (!bannedUser) console.log('Member unbanned');
        await message.guild.members.unban(bannedUser.user, reason).catch(err => console.log(err));
      });
    }, ms(time));
  }
}