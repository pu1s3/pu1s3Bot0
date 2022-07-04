const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class WarnCommand extends BaseCommand {
  constructor() {
    super('warn', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permision to use this command.");
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I require \`MANAGE ROLES\` permissmion to manage a users warnings.");

    const warnRole1 = message.guild.roles.cache.find(role => role.name === '[Warning: 1]');
    const warnRole2 = message.guild.roles.cache.find(role => role.name === '[Warning: 2]');
    const warnRole3 = message.guild.roles.cache.find(role => role.name === '[Warning: 3]');
    const MuteRole = message.guild.roles.cache.find(role => role.name === 'Mute');
    const ticketChannel = message.guild.channels.cache.find(channel => channel.name == 'ticket');
    const mentionedMember = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
    let punishment = 1;
    let reason = args.slice(2).join(" ");

    if (!MuteRole) await message.guild.roles.create({
      data: {
        name: 'Mute',
        color: 'RED'
      }
    }).catch(err => console.log(err));

    if (!warnRole1) await message.guild.roles.create({
      data: {
        name: '[Warning: 1]',
        color: 'GREY'
      }
    }).catch(err => console.log(err));

    if (!warnRole2) await message.guild.roles.create({
      data: {
        name: '[Warning: 2]',
        color: 'GREY'
      }
    }).catch(err => console.log(err));

    if (!warnRole3) await message.guild.roles.create({
      data: {
        name: '[Warning: 3]',
        color: 'GREY'
      }
    }).catch(err => console.log(err));

    //.warn @member [add, remove] [reason]
    if (!args[0]) return message.channel.send('You need to state a member along with if you are just checking, adding or removing warnings.');
    if (!mentionedMember) return message.channel.send('The member stated is not in the server.');
    if (!reason) reason = 'No reason provided';

    if (mentionedMember.roles.cache.has(warnRole1.id)) punishment = 2;
    if (mentionedMember.roles.cache.has(warnRole2.id)) punishment = 3;
    if (mentionedMember.roles.cache.has(warnRole3.id)) punishment = 4;

    if (!['add', 'remove'].includes(args[1])) {
      if (punishment == 1) {
        return message.channel.send(`${mentionedMember.user.tag} has no warnings.`);
      } else if (punishment == 2) {
        return message.channel.send(`${mentionedMember.user.tag} has one warnings.`);
      } else if (punishment == 3) {
        return message.channel.send(`${mentionedMember.user.tag} has two warnings.`);
      } else if (punishment == 4) {
        return message.channel.send(`${mentionedMember.user.tag} has three warnings.`);
      }
    } else {
      if (args[1] == 'add') {
        if (punishment == 1) {
          await mentionedMember.roles.add(warnRole1.id).catch(err => console.log(err));
          return message.channel.send(`${mentionedMember}, you have been warned for: ${reason} `)

        } else if (punishment == 2) {
          await mentionedMember.roles.add(warnRole2.id).catch(err => console.log(err));
          await mentionedMember.roles.remove(warnRole1.id).catch(err => console.log(err));
          return message.channel.send(`${mentionedMember}, you have been warned for: ${reason} `)
        } else if (punishment == 3) {
          await mentionedMember.roles.add(warnRole3.id).catch(err => console.log(err));
          await mentionedMember.roles.remove(warnRole2.id).catch(err => console.log(err));
          return message.channel.send(`${mentionedMember}, you have been warned for: ${reason} `)
        } else if (punishment == 4) {
          await mentionedMember.roles.add(MuteRole.id).catch(err => console.log(err));
          await mentionedMember.roles.remove(warnRole3.id).catch(err => console.log(err));
          return message.channel.send(`${mentionedMember}, you have been placed on mute pls make a ${ticketChannel} and wait for a response reason: ${reason}`);
        }
      } else if (args[1] == 'remove') {
        if (punishment == 1) {
          return message.channel.send(`${mentionedMember.user.tag} has no wanings to remove.`);
        } else if (punishment == 2) {
          await mentionedMember.roles.remove(warnRole1.id).catch(err => console.log(err));
          return message.channel.send(`I removed a warning from ${mentionedMember.user.tag}`)
        } else if (punishment == 3) {
          await mentionedMember.roles.remove(warnRole2.id).catch(err => console.log(err));
          return message.channel.send(`I removed a warning from ${mentionedMember.user.tag}`)
        } else if (punishment == 4) {
          await mentionedMember.roles.add(MuteRole.id)
          await mentionedMember.roles.remove(warnRole3.id).catch(err => console.log(err));
          return message.channel.send(`I removed a warning from ${mentionedMember.user.tag}`)
        }
      }
    }
  }
}