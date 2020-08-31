const express = require('express')
const bodyParser = require('body-parser');

const createMongoDbConnection = require('./config/mongoose');
const Trades = require('./routes/tradeRoute');
const Returns = require('./routes/returnRoute');
const Holdings = require('./routes/holdingRoute');
const Portfolio = require('./routes/portfolioRoute');

const app = express();

createMongoDbConnection();

app.use(bodyParser.json());

app.use('/trades',Trades);
app.use('/returns',Returns);
app.use('/holdings',Holdings);
app.use('/portfolio',Portfolio);

module.exports = app;
