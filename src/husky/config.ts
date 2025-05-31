import * as path from 'path';


export const CHECK_JS_WHITE_DIR = [
  `src${path.sep}project`,
  `src${path.sep}local-component`,
  `src${path.sep}local-logic`,
];


export const SUB_PROJECT_CONFIG_JS_REG = /src[/\\]project[/\\][\w-_]+[/\\]config\.js$/;
