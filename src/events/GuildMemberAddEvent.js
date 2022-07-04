const { MessageAttatchment } = require('discord.js');
const BaseEvent = require('../utils/structures/BaseEvent');
module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd')
  }

  async run(client, member) {
    //const role = member.guild.roles.cache.get('');
    //await member.roles.add(role.id).catch(err => console.log(err));

    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name == 'welcome');
    const rulesChannel = member.guild.channels.cache.find(channel => channel.name == 'rules')
    welcomeChannel.send(`<@${member.user.id}>, Welcome to ${member.guild.name}. Read the rules: ${rulesChannel}`);
  }
}