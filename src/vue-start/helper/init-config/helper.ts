export function initCommonConfig(app) {
  if (process.env.NODE_ENV == 'production') {
    app.config.devtools = false;
  } else {
    app.config.devtools = true;
  }
}
