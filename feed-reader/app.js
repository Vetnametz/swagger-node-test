'use strict';

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const mongoose = require('mongoose');
mongoose.connect('localhost:27017/feedreader');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', (callback) => {
  console.log(`DB was opend`);
});
module.exports = app; // for testing

const config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);
  
  const port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/login']) {
    console.log(`try this:
    curl http://127.0.0.1:${port}/login?username=Scott`);
  }
});
