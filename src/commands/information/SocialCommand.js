const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SocialCommand extends BaseCommand {
  constructor() {
    super('social', 'information', []);
  }

  async run(client, message, args) {
    const youtubeEmbed = new Discord.MessageEmbed()
      .setTitle('Team Pu1s3')
      .setURL('https://youtube.com/pu1s3gaming')
      .setThumbnail('https://pngimg.com/uploads/youtube/youtube_PNG14.png')
      .setColor('#b31217')
      .addField('Check out Team Pu1s3\'s YouTube channel.', 'NEW DISCORD VIDEOS AND SOME HOW TO VIDEOS (Click the link above)')
      .setTimestamp()
      .setFooter("Team Pu1s3", "https://lh3.googleusercontent.com/ogw/ADea4I7DBbP5lGYHWju_ECKM7yAc_LykgbvUrKy7jVU1uw=s32-c-mo");

    const discordEmbed = new Discord.MessageEmbed()
      .setTitle('Join the official server for ```Team Pu1s3```')
      .setURL('https://discord.gg/pVPWR6uEd6')
      .setThumbnail("https://www.imore.com/sites/imore.com/files/styles/large/public/field/image/2021/04/discord-logo.jpg")
      .setColor("#7289da")
      .addField('If you are looking for new friends and want to learn coding well you have came to the righ place, We also have a intergrated twitch follow bot in the server so if you want some twitch followers you might aswell join up')
      .setTimestamp()
      .setFooter("Pu1s3", "https://styles.redditmedia.com/t5_5qvsy7/styles/communityIcon_r1cpldqf84e81.jpg?format=pjpg&s=992e41f908dcd8c095f6589ddd5a2af8010182c8");

    const websiteEmbed = new Discord.MessageEmbed()
      .setTitle('Visit My Website')
      .setURL('https://pu1s3.xyz/home')
      .setThumbnail('https://styles.redditmedia.com/t5_5qvsy7/styles/communityIcon_r1cpldqf84e81.jpg?format=pjpg&s=992e41f908dcd8c095f6589ddd5a2af8010182c8')
      .setColor('#FF424D')
      .addField('Visit my website it will make it easier to join all of my servers and invite all of my bots so please go and visit it..')
      .setTimestamp()
      .setFooter("Team Pu1s3", "https://styles.redditmedia.com/t5_5qvsy7/styles/communityIcon_r1cpldqf84e81.jpg?format=pjpg&s=992e41f908dcd8c095f6589ddd5a2af8010182c8");

      await message.channel.send(youtubeEmbed).catch(err => console.log(err));
      await message.channel.send(discordEmbed).catch(err => console.log(err));
      await message.channel.send(websiteEmbed).catch(err => console.log(err));
  }
}