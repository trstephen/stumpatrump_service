function configFilename() {
  return process.env.NODE_ENV || 'dev';
}

module.exports = { configFilename };
