const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')
const recon = require('reconlx');
const ReasctionPages = recon.ReactionPages;

module.exports = class EmbedCommand extends BaseCommand {
  constructor() {
    super('embed', 'fun', []);
  }

  async run(client, message, args) {
    const embed1 = new Discord.MessageEmbed()
    .setTitle(`This is the first page.`)

    const embed2 = new Discord.MessageEmbed()
    .setTitle(`This is the second page`);

    const pages = [embed1, embed2];
    const emojis = ['◀️', '▶️'];

    recon.ReactionPages(message, pages, true, emojis);
  }
}