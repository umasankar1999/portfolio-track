const express = require('express');
const { body, param, validationResult } = require('express-validator');

const SecurityModel = require('../models/Securities');
const TradeModel = require('../models/Trades');
const TradeController = require('../controllers/TradeController');

const Trades = express.Router();

const validateAddTrade =  () =>  [
  body('ticker').exists().isString(),
  body('ticker').custom( val => {
    return SecurityModel.find({'ticker':val}).then(res => {
      if(res.length === 0) throw new Error("Company Doesn't Exist in Portfolio");
    })
  }),
  body('noOfShares').exists().isInt().custom(val => {
    return val > 0 ? true : false;
  }),
  body('price').exists().isInt().custom(val => {
    return val > 0 ? true : false;
  }),
  body('typeOfTrade').exists().isString().isIn(['buy','sell'])
]


Trades.post('/',validateAddTrade(),async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = req.body;
    const newTrade = {ticker:data.ticker,noOfShares:data.noOfShares,price:data.price,typeOfTrade:data.typeOfTrade,createdAt: new Date().toISOString(),updatedAt:null}; 
    res.json(await TradeController.addTrade(newTrade));
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error')
  }
});

const validateUpdateTrade = () => [
  param('tradeId').exists().isString(),
  param('tradeId').custom(val => {
    return TradeModel.find({_id:val}).then(res => {
      if(res.length === 0) throw new Error("TradeId is invalid");
    });
  }),
  ...validateAddTrade()
]

Trades.put('/:tradeId',validateUpdateTrade(),async (req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = req.body;
    const {tradeId} = req.params;
    const newTrade = {ticker:data.ticker,noOfShares:data.noOfShares,price:data.price,typeOfTrade:data.typeOfTrade}; 
    res.json(await TradeController.updateTrade(newTrade,tradeId));
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

const validateDelTrade = () => [
  param('tradeId').exists().isString(),
  param('tradeId').custom(val => {
    return TradeModel.find({_id:val}).then(res => {
      if(res.length === 0) throw new Error("TradeId is invalid");
    });
  })
]

Trades.delete('/:tradeId',validateDelTrade(),async (req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {tradeId} = req.params;
    return res.json(await TradeController.deleteTrade(tradeId));
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error')
  }
})

module.exports = Trades;