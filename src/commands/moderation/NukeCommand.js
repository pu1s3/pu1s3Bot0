const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class NukeCommand extends BaseCommand {
  constructor() {
    super('nuke', 'moderation', []);
  }

  async run(client, message, args) {
    //.nuke reason
    //Permisson Checking:
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You can not use this command.");
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("My role does not have the manage channels permisson");
    
    //Variables
    let reason = args.join(" ");
    const nukeChannel = message.channel;
    
    //Input Checking:
    if (!reason) reason = "No reason given";
    if (!nukeChannel.deleteable) return message.channel.send("This channel is not deleteable");

    //Executing:
    await nukeChannel.clone().catch(err => console.log(err));
    await nukeChannel.delete(reason).catch(err => console.log(err));

  }
}