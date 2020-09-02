const express = require('express')
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./api-doc/swagger.json');

const createMongoDbConnection = require('./config/mongoose');
const Trades = require('./routes/tradeRoute');
const Returns = require('./routes/returnRoute');
const Holdings = require('./routes/holdingRoute');
const Portfolio = require('./routes/portfolioRoute');

const app = express();

// creates connection with mongodb server
createMongoDbConnection();

app.use(bodyParser.json());

app.get('/',(req,res)=>{
  res.send("Portfolio Tracking API")
})

// api documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routes
app.use('/trades',Trades);
app.use('/returns',Returns);
app.use('/holdings',Holdings);
app.use('/portfolio',Portfolio);

module.exports = app;
