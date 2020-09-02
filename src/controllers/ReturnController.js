const SecurityModel  = require('../models/Securities');

const { CURRENT_PRICE } = require('../consts/trade');

const ReturnController = {
  async fecthReturns() {
    // get all securities
    const securities = await SecurityModel.find().select('avgBuyPrice quantity');
    let totalReturns = 0;
    // find the total returns by iterating through securities.
    for(i in securities){
      totalReturns = totalReturns + ((CURRENT_PRICE - securities[i].avgBuyPrice)*securities[i].quantity);
    }
    return { totalReturns };
  },
}

module.exports = ReturnController;