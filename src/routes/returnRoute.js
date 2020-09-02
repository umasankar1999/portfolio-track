const express = require('express');

const ReturnController = require('../controllers/ReturnController');

const Returns = express.Router();

// const validateReturns = () => [
//   param('ticker').exists().isString(),
//   param('ticker').custom(val => {
//     return SecurityModel.find({ticker:val}).then(res => {
//       if(res.length === 0) throw new Error('Company Doesnt exist');
//     })
//   })
// ]

Returns.get('/',async (req,res)=>{
  try {
    // send response from Return controller
    res.json(await ReturnController.fecthReturns());
  } catch (error) {
    console.log(err);
    res.status(500).send('Internal Server Error')
  }
})

module.exports = Returns;