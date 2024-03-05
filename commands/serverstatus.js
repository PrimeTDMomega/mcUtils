const axios = require('axios');
const { blue, green, red } = require('kleur');

async function serverStatus(options) {
  const { url, port } = options;

  if (!url) {
    console.error(red('Error: URL is required.'));
    process.exit(1);
  }

  const baseUrl = `http://${url}`;
  const defaultPort = 25565;
  const finalPort = port || defaultPort;

  try {
    const response = await axios.get(`${baseUrl}:${finalPort}/`);
    console.log(blue(`Server status for ${baseUrl}:${finalPort}:`));
    console.log(green(`- Online players: ${response.data.players.online}`));
    console.log(`- Max players: ${response.data.players.max}`);
    console.log(`- Version: ${response.data.version.name}`);
    console.log(`- Motd: ${response.data.description.text}`);
    console.log(`- Players:`);
    response.data.players.sample.forEach((player, index) => {
      console.log(`${index + 1}. ${player.name}`);
    });
    console.log(`- Uptime: ${response.data.player_list[0].ping}ms`);
  } catch (error) {
    console.error(red(`Error: Could not connect to ${baseUrl}:${finalPort}`));
    console.error(red(error.message));
    process.exit(1);
  }
}

module.exports = serverStatus;