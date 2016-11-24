const _ = require('lodash');
const configFilename = require('./config_helper').configFilename;
const twitterConfig = require(`../config/${configFilename()}`).twitter;
const Twit = require('twit');
let twitterClient;

function getClient() {
  if (!twitterClient) {
    const defaultOpts = {
      timeout_ms: 10 * 1000, // 10 sec
    };

    // TODO: gracefully fail if API credentials are missing
    twitterClient = new Twit(_.defaults({}, twitterConfig, defaultOpts));
  }

  return twitterClient;
}

module.exports = {
  getClient,
};
