const { program } = require('commander');
const { blue, green, red } = require('kleur');
const {
  serverStatus,
  recipeLookup,
  blockInfo,
} = require('./commands');

program
  .command('serverstatus [options]')
  .description('Get the status of a Minecraft server')
  .option('-u, --url <url>', 'URL of the server to check')
  .option('-p, --port <port>', 'Port number of the server', '25565')
  .action(async (options) => {
    try {
      await serverStatus(options);
    } catch (error) {
      console.error(red(error.message));
      process.exit(1);
    }
  });

program
  .command('recipelookup [options]')
  .description('Look up a recipe in Minecraft')
  .option('-i, --item <item>', 'Name of the item to look up')
  .action(async (options) => {
    try {
      await recipeLookup(options);
    } catch (error) {
      console.error(red(error.message));
      process.exit(1);
    }
  });

program
  .command('blockinfo [options]')
  .description('Get information about a Minecraft block')
  .option('-n, --name <name>', 'Name of the block to look up')
  .action(async (options) => {
    try {
      await blockInfo(options);
    } catch (error) {
      console.error(red(error.message));
      process.exit(1);
    }
  });

program.parse(process.argv);