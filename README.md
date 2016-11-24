Stump-A-Trump: Service
=====
It's the backend service for a guessing game that challenges you to determine which tweets are from President Elect Donald J. Trump and which are from parody accounts.

Part of the client-server game project for [CENG 356](http://www.ece.uvic.ca/~ceng356/) at UVic.

Can be used with the [Stump-A-Trump CLI](https://github.com/trstephen/stumpatrump_cli).

### Installation
Install the node version in [.nvmrc](.nvmrc). You can use [nvm](https://github.com/creationix/nvm) to automatically load the correct node version. It's cool and good.

```shell
git clone git@github.com:trstephen/stumpatrump_service.git

cd stumpatrump_service

npm install
```

You'll need to add your own Twitter API credentials to [dev.json](./config/dev.json). Follow [this guide from Twitter](https://dev.twitter.com/oauth/overview/application-owner-access-tokens) to generate your credentials.

```shell
npm start
```

Your client should be active on `localhost:3000`.
