/* eslint-disable @typescript-eslint/no-require-imports */

export function nodePost() {
  const util = require('util');
  const request = require('request');

  const post = util.promisify(request.post);
  return post;
}


export function nodeGet() {
  const util = require('util');
  const request = require('request');

  const get = util.promisify(request.get);
  return get;
}


export function nodePut() {
  const util = require('util');
  const request = require('request');

  const get = util.promisify(request.put);
  return get;
}

