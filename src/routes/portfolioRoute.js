const express = require('express');

const PortfolioController = require('../controllers/PortfolioController');

const Portfolio = express.Router();

Portfolio.get('/',async (req,res)=>{
  try {
    // send response from Portfolio controller
    res.json(await PortfolioController.getPortfolio());
  } catch (error) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
})

module.exports = Portfolio;