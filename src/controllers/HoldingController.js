const SecurityModel = require('../models/Securities');

const HoldingController = {
  async getHoldings() {
    // get all securities and send back the response.
    const securities = await SecurityModel.find();
    return securities;
  }
}

module.exports = HoldingController;