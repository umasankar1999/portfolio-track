const SecurityModel = require('../models/Securities');

const HoldingController = {
  async getHoldings() {
    const securities = await SecurityModel.find();
    return securities;
  }
}

module.exports = HoldingController;