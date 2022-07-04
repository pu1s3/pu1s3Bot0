const { DiscordAPIError } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');
const Discord = require('discord.js');

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (message.author.bot) return;

    const mentionedMember = message.mentions.members.first();
    const role = message.guild.roles.cache.get('838927446690234398');

    if (mentionedMember) {
      if (mentionedMember.roles.cache.has(role.id)) {
      const noEmbed = new Discord.MessageEmbed()
        .setTitle(`${message.author.tag} please do not attempt to ping this person.`)
        .setColor('RED')
        .setImage('https://media.giphy.com/media/ZvwTA5OIeG8rEL9xW0/giphy.gif')
      await message.reply(noEmbed).catch(err => console.log(err));
      }
    }

    if (message.content.startsWith(client.prefix)) {
      const [cmdName, ...cmdArgs] = message.content
      .slice(client.prefix.length)
      .trim()
      .split(/\s+/);
      const command = client.commands.get(cmdName);
      if (command) {
        command.run(client, message, cmdArgs);
      }
    }
  }
}