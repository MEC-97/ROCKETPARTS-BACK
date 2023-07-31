const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index');
const {populateDatabase} = require("../script/poblar.js")
const { auth } = require('express-openid-connect');
require("dotenv").config();

const { CLIENT_ID, CLIENT_SECRET } = process.env;
// post present


const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {

    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
server.use('/', routes);

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: CLIENT_SECRET,
  baseURL: 'http://localhost:3000',
  clientID: CLIENT_ID,
  issuerBaseURL: 'https://dev-jzsyp78gzn6fdoo4.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
server.use(auth(config));


server.use('/', routes);

server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


  populateDatabase();
 
module.exports = server;

