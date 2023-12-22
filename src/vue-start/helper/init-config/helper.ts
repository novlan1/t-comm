export function initCommonConfig(app: { config: { devtools: boolean } }) {
  if (process.env.NODE_ENV == 'production') {
    app.config.devtools = false;
  } else {
    app.config.devtools = true;
  }
}
