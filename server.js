const _ = require('lodash');
const express = require('express');
const configFilename = require('./lib/config_helper').configFilename;

const config = require(`./config/${configFilename()}`);
const app = express();

app.listen(config.serverPort, () => {
  console.log(`Listening on ${config.serverPort}`);
});

// Add routes to the app
// Add the specific version of a resource before the general version
// i.e., GET /users/:something_specific is before GET /users/:user_id
_.forEach([
  './routes/v1/get',
  './routes/v1/tweets/get',
  './routes/v1/tweets/:tweet_id/get',
], route => {
  require(route)(app); // eslint-disable-line global-require
});
