const SecurityModel = require('../models/Securities');

const PortfolioController = {
  async getPortfolio() {
    // Join both securities and trades table and get the portfolio.
    const res = await SecurityModel.aggregate([{
      $lookup : {
        from: "trades",
        localField: "_id",
        foreignField: "securityId",
        as: "trades"
      }
    }])
    return res;
  }
}

module.exports = PortfolioController