
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import {sqlize} from './db';
import {exec} from './seed';
import routes from './routes';
import * as aws from './aws';

//Setup db server
sqlize.authenticate()
  .then(() => {
    console.log('DB connection has been established successfully');
    return sqlize.sync();
  })
  .then(() => {
    console.log('DB sync is completed');
    exec();
  })
  .catch(err => {
    throw `Unable to connect to database: ${err}`;
  });

// Setup server
const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
// Setup express routes
routes(app);

// Start server
const server = http.createServer(app);
server.listen(9000, () => {
  console.log('Express server up and running');
});

// Expose app
exports = module.exports = app;
