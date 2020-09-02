const express = require('express');
const { validationResult } = require('express-validator');

const { validateBody,validateParam,validateUpdateTrade } = require('../validators/tradeValidator');
const TradeController = require('../controllers/TradeController');

const Trades = express.Router();

// validateBody is a middleware functions which validate's the req data
Trades.post('/',validateBody(),async(req,res)=>{
  try {
    const errors = validationResult(req);
    // if found errors in validation then return bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // extract data from req object and change into desired format
    const data = req.body;
    const newTrade = {ticker:data.ticker,noOfShares:data.noOfShares,price:data.price,typeOfTrade:data.typeOfTrade,createdAt: new Date().toISOString(),updatedAt:null}; 
    // send response Trade controller.
    res.json(await TradeController.addTrade(newTrade));
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error')
  }
});

// validateUpdateTrade is a middleware functions which validate's the params as well as req body.
Trades.put('/:tradeId',validateUpdateTrade(),async (req,res)=>{
  try {
    const errors = validationResult(req);
    // if found errors in validation then return bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // extract data from req object and change into desired format
    const data = req.body;
    const {tradeId} = req.params;
    const newTrade = {ticker:data.ticker,noOfShares:data.noOfShares,price:data.price,typeOfTrade:data.typeOfTrade}; 
    // send response Trade controller.
    res.json(await TradeController.updateTrade(newTrade,tradeId));
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// validateParam is a middleware functions which validate's the params
Trades.delete('/:tradeId',validateParam(),async (req,res)=>{
  try {
    const errors = validationResult(req);
    // if found errors in validation then return bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {tradeId} = req.params;
    // send response Trade controller.
    return res.json(await TradeController.deleteTrade(tradeId));
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error')
  }
})

module.exports = Trades;