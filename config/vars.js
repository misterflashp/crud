let server = {
  port: 3000
};

let mongoDb = {
  address: '127.0.0.1',
  port: 27017,
  dbName: 'itemPrices'
};

module.exports = {
  server,
  mongoDb
};
