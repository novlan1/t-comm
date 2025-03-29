const path = require('path');

const { writeEnvFromRainbow } = require('../../lib');

const envPath = path.resolve(__dirname, '../../.env.local');

async function main() {
  await writeEnvFromRainbow({
    envPath,
    rainbowKey: 't_comm_env',
    envName: 'Default',
    groupName: 'devops',
  });
}

main();
