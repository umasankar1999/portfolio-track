const express = require('express');

const HoldingController = require('../controllers/HoldingController');

const Holdings = express.Router();

Holdings.get('/',async (req,res) => {
  try {
    // send response from Holding controller
    res.json(await HoldingController.getHoldings());
  } catch (error) {
    console.log(err);
    res.status(500).send('Internal Server Error')
  }
})

module.exports = Holdings;