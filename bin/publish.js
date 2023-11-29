const { execSync } = require('child_process');


function publish(options) {
  console.log('[options] ', options);
  const { source, target, name, password, port } = options;

  if (!source || !target || !name || !password || !port) {
    console.error('缺少必要参数，请检查！');
    return;
  }

  publishWithBash({
    source,
    target,
    name,
    password,
    port,
  });
}

function publishWithBash({
  source,
  target,
  name,
  password,
  port,
}) {
  const publishBash = require('path').resolve(__dirname, './publish.sh');
  const command = `sh ${publishBash} ${source} ${target} ${name} ${password} ${port}`;

  execSync(command, {
    cwd: process.cwd(),
    encoding: 'utf-8',
    stdio: 'inherit',
  });
}


module.exports = {
  publish,
};
