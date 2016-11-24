const _ = require('lodash');
const twitterHelper = require('../../../lib/twitter_helper');
const constants = require('../../../lib/constants');

const MAX_TWEETS_TO_PULL = 20;

function getTweets(req, res) {
  const twitterClient = twitterHelper.getClient();

  // determine who to pull a tweet from
  const allScreenNames = _.flatMap(constants.TWITTER_ACCOUNTS);
  const randomScreenNameIndex = Math.floor(Math.random() * _.size(allScreenNames));
  const randomScreenName = allScreenNames[randomScreenNameIndex];

  const getRecentTweetsFromUser = {
    count: MAX_TWEETS_TO_PULL,
    screen_name: randomScreenName,
    trim_user: true,
  };

  // pull the tweet
  twitterClient.get('statuses/user_timeline', getRecentTweetsFromUser)
    .then(resp => {
      if (!_.size(resp.data)) throw new Error(`No tweets for ${randomScreenName}`);

      const randomTweetIndex = Math.floor(Math.random() * _.size(resp.data));
      const randomTweet = resp.data[randomTweetIndex];

      const tweetFieldsToExtract = [
        'created_at',
        'id_str',
        'text',
      ];

      return _(randomTweet)
        .pick(tweetFieldsToExtract)
        .mapKeys((val, key) => constants.TWEET_FIELD_KEYMAP[key] || key)
        .value();
    })
    // save the tweet in cache
    // return the tweet
    .then(tweet => res.send(tweet))
    .catch(err => console.error(err));
}

module.exports = (app) => {
  app.get('/tweets', getTweets);
};
