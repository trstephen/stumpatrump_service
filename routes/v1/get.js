function home(req, res) {
  return res.send('I am in a route!');
}

module.exports = (app) => {
  app.get('/', home);
};
