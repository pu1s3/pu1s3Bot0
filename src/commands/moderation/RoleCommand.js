const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class RoleCommand extends BaseCommand {
  constructor() {
    super('role', 'moderation', []);
  }

  async run(client, message, args) {
    //.role @member @role
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('You do not have permission to use this command.');
    if (!message.guild.me.hasPermission("MANAG_ROLES")) return message.channel.send('I require \`MANAGE ROLES\`permission to change users roles.');

    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

    if (!args[0]) return message.channel.send('You must state a member to give the role to along with the role you want to give.');
    if (!mentionedMember) return message.channel.send('The member stated is not in the server.');
    if (mentionedMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('You cannot add roles to this user as there role is the same as yours or higher.');
    if (!args[1]) return message.channel.send('You must state a role to give to the member mentioned.');
    if (!role) return message.channel.send('The role stated does not exist.');
    if (message.member.roles.highest.position <= role.position) return message.channel.send('You cannot give the role as it is above or above your current  highest role.');

    await mentionedMember.roles.add(role.id).catch(err => console.log(err));
  }
}