const { Client, Collection, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: 3276799 });
const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('../slappey.json');
client.snipes = new Map();

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();

