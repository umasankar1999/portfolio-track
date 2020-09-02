const { body, param } = require('express-validator');

const SecurityModel = require('../models/Securities');
const TradeModel = require('../models/Trades');

const validateBody =  () =>  [
  // validates ticker property
  body('ticker').exists().isString(),
  // validates if ticker exits in db or not
  body('ticker').custom( val => {
    return SecurityModel.find({'ticker':val}).then(res => {
      if(res.length === 0) throw new Error("Company Doesn't Exist in Portfolio");
    })
  }),
  // validates noOfShares property
  body('noOfShares').exists().isInt().custom(val => {
    return val > 0 ? true : false;
  }),
  // validates price property
  body('price').exists().isInt().custom(val => {
    return val > 0 ? true : false;
  }),
  // validates typeOfTrade property
  body('typeOfTrade').exists().isString().isIn(['buy','sell'])
]

const validateParam = () => [
  // validates tradeId parameter
  param('tradeId').exists().isString(),
  // validates if trade exits in db or not
  param('tradeId').custom(val => {
    return TradeModel.find({_id:val}).then(res => {
      if(res.length === 0) throw new Error("TradeId is invalid");
    });
  })
]

const validateUpdateTrade = () => [
  // validates both params and body (used for updateTrade req)
  ...validateParam(),
  ...validateBody()
]

module.exports = {
  validateBody,
  validateParam,
  validateUpdateTrade
};