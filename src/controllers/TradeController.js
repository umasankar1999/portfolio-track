const SecurityModel = require('../models/Securities');
const TradeModel = require('../models/Trades');

const { TRADE_PROPS  } = require('../consts/trade');

// this function revert backs the changes on a security that a trade made.
const unBackChanges = async ({securityId,noOfShares,price}) => {
  // get the security to be changed
  const security = await SecurityModel.findOne({_id : securityId});
  // find the old avgBuyPrice and quantity
  let avgBuyPrice = ((security.avgBuyPrice*security.quantity) - (noOfShares*price))/(security.quantity - noOfShares);
  let quantity = security.quantity - noOfShares;
  // update with old values
  await SecurityModel.findOneAndUpdate(
    { _id : securityId},
    { $set : {'avgBuyPrice': avgBuyPrice.toFixed(2), 'quantity': quantity,'updatedAt': new Date().toISOString() }}
  )
}

// this function will update the security avgBuyPrice, quantity
const updateSecurity = async (security,trade) => {
  let avgBuyPrice = security.avgBuyPrice;
  let quantity = security.quantity;
  // calculate new avgBuyPrice and quantity.
  avgBuyPrice = ((avgBuyPrice*quantity) + (trade.price*trade.noOfShares))/(quantity+trade.noOfShares);
  quantity = quantity + trade.noOfShares;
  // update with the new values
  await SecurityModel.findOneAndUpdate(
    {ticker : trade.ticker},
    {$set : {'avgBuyPrice': avgBuyPrice.toFixed(2), 'quantity': quantity,'updatedAt': new Date().toISOString() }},
  );
}

const TradeController =  {
  async addTrade(trade){ 
    // get the security
    const security = await SecurityModel.findOne({ticker : trade.ticker});
    let securityId = security._id;
    // if trade type is buy then update the security avgBuyPrice and quantity.
    if(trade.typeOfTrade === "buy")
    { 
      await updateSecurity(security,trade);
    }
    // insert the new trade into the db
    const [newTrade] = await TradeModel.insertMany(
      {...trade,securityId},
    );
    // return the response
    return newTrade; 
  },

  async updateTrade(trade,tradeId) {
    // get the old trade details.
    const oldTrade = await TradeModel.findOne({_id : tradeId});
    // its a flag which tells if any property is changed in new trade
    // with compared to its old trade or not
    let changeFlag = 0;
    // check these props changed in new trade or not.
    let propArray = TRADE_PROPS
    for( i in propArray)
    {
      if(oldTrade[propArray[i]] != trade[propArray[i]]){
        changeFlag = 1;
        break;
      }
    }
    // if those props didn't change then just send the old response.
    if(changeFlag === 0)
      return oldTrade;
    // if it cames here means some thing is changed, and if old tradetype is buy
    // then revert back the changes it made on the security
    if(oldTrade.typeOfTrade !== "sell")
      await unBackChanges(oldTrade);
    // get the security 
    const security = await SecurityModel.findOne({ticker : trade.ticker});
    let securityId = security._id;
    // if updated trade type is buy apply those changes in the security
    if(trade.typeOfTrade === "buy")
    { 
      await updateSecurity(security,trade);
    }
    // update the trade in the db as well.
    const updatedTrade = TradeModel.findOneAndUpdate(
      {_id : tradeId},
      {$set : {...trade,securityId,'updatedAt' : new Date().toISOString()}},
      { new:true}
    )
    return updatedTrade;
  },

  async deleteTrade(tradeId) {
    // get the trade
    const Trade = await TradeModel.findOne({_id : tradeId});
    // if the trade type is buy, then revert back the changes before delete.
    if(Trade.typeOfTrade !== "sell")
      await unBackChanges(Trade);
    // delete the trade
    await TradeModel.findByIdAndDelete({_id : tradeId});
    return { tradeId };
  }
}

module.exports = TradeController;