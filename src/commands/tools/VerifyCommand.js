const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class VerifyCommand extends BaseCommand {
  constructor() {
    super('verify', 'tools', []);
  }

  async run(client, message, args) {
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I require \`MANAGE_ROLES\` permission.");

    const role = message.guild.roles.cache.get('856561491641892884');

    await message.member.roles.add(role.id).catch(err => console.log(err));
  }
}