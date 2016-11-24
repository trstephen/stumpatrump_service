const _ = require('lodash');
const twitterHelper = require('../../../../lib/twitter_helper');
const constants = require('../../../../lib/constants');

function getTweet(req, res) {
  const twitterClient = twitterHelper.getClient();

  const getTweetOpts = {
    id: req.params.tweet_id,
    trim_user: false,
    include_my_retweet: false,
    include_entities: false,
  };

  twitterClient.get('statuses/show/:id', getTweetOpts)
    .then(resp => {
      if (_.size(resp.data.errors)) throw resp.data.errors;

      const screenName = resp.data.user.screen_name;

      res.send({
        id: req.params.tweet_id,
        isTrump: screenName === constants.TWITTER_ACCOUNTS.TRUMP,
        screenName,
      });
    })
    .catch(err => {
      res.send('There were errors :(');
      console.error(err);
    });
}

module.exports = (app) => {
  app.get('/tweets/:tweet_id', getTweet);
};
