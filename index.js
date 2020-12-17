const schedule = require('node-schedule');
const stdio = require('stdio');
const chalk = require('chalk');
const fetch = require('node-fetch');
const ops = stdio.getopt({
  'dest': {
    args: 1,
    description: 'Destination you want to run against.',
    required: true
  },
  'interval': {
    args: 1,
    description: 'How often in seconds do you want to fire this task?',
    required: true
  },
});

const fireCrons = schedule.scheduleJob(`*/${ops.interval} * * * *`, async () => {
  try {
    const cron = await fetch(ops.dest);
    console.log(chalk.green(`🕐 Cron ran at: ${ new Date().toString() }`));
  } catch(err) {
    console.log(chalk.red('Failed to Fetch'));
  }
});

console.log(chalk.blue(`Chronic started for ${ ops.dest } and will run every ${ops.interval} minutes.`));
