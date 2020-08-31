const SecurityModel  = require('../models/Securities');

const ReturnController = {
  async fecthReturns() {
    const securities = await SecurityModel.find().select('avgBuyPrice quantity');
    let totalReturns = 0;
    for(i in securities){
      totalReturns = totalReturns + ((100 - securities[i].avgBuyPrice)*securities[i].quantity);
    }
    return { totalReturns };
  },
}

module.exports = ReturnController;