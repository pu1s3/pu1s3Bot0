const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class CalcCommand extends BaseCommand {
  constructor() {
    super('calc', 'information', ['calculator', 'calculate']);
  }

  async run(client, message, args) {
    //.calc number sign number
    const firstValue = Number(args[0]);
    const secondValue = Number(args[2]);

    if (!args[0]) return message.channel.send(`You have to input more argumnts \`${client.prefix}calc number [+, -, ×, /] number\``);
    if (!firstValue) return message.channel.send('The first value stated is not a number.');
    if (!args[1]) return message.channel.send('You have to state what you want to do with this number. Options: +, -, ×, /');
    if (!['+', '-', '×', '/'].includes(args[1])) return message.channel.send('You did not state a method to apply to these numbers: +, -, ×, /');
    if (!secondValue) return message.channel.send('The second vale stated is not a number.');

    if (args[1] == '+') {
      let result = firstValue + secondValue;
      message.channel.send(`${firstValue} + ${secondValue} = ${result}.`);
    }

    if (args[1] == '-') {
      let result = firstValue - secondValue;
      message.channel.send(`${firstValue} - ${secondValue} = ${result}.`);
    }

    if (args[1] == '×') {
      let result = firstValue * secondValue;
      message.channel.send(`${firstValue} × ${secondValue} = ${result}.`);
    }

    if (args[1] == '/') {
      let result = firstValue / secondValue;
      message.channel.send(`${firstValue} / ${secondValue} = ${result}.`);
    }
  }
}