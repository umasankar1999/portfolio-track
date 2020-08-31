const SecurityModel = require('../models/Securities');
const TradeModel = require('../models/Trades');

const unBackChanges = async ({securityId,noOfShares,price}) => {
  console.log(securityId,noOfShares,price);
  const security = await SecurityModel.findOne({_id : securityId});
  console.log(security);
  let avgBuyPrice = ((security.avgBuyPrice*security.quantity) - (noOfShares*price))/(security.quantity - noOfShares);
  let quantity = security.quantity - noOfShares;
  await SecurityModel.findOneAndUpdate(
    { _id : securityId},
    { $set : {'avgBuyPrice': avgBuyPrice.toFixed(2), 'quantity': quantity,'updatedAt': new Date().toISOString() }}
  )
}

const updateSecurity = async (security,trade) => {
  let avgBuyPrice = security.avgBuyPrice;
  let quantity = security.quantity;
  avgBuyPrice = ((avgBuyPrice*quantity) + (trade.price*trade.noOfShares))/(quantity+trade.noOfShares);
  quantity = quantity + trade.noOfShares;
  await SecurityModel.findOneAndUpdate(
    {ticker : trade.ticker},
    {$set : {'avgBuyPrice': avgBuyPrice.toFixed(2), 'quantity': quantity,'updatedAt': new Date().toISOString() }},
  );
}

const TradeController =  {
  async addTrade(trade){ 
    const security = await SecurityModel.findOne({ticker : trade.ticker});
    let securityId = security._id;
    if(trade.typeOfTrade === "buy")
    { 
      await updateSecurity(security,trade);
    }
    const [newTrade] = await TradeModel.insertMany(
      {...trade,securityId},
    );
    console.log(newTrade);
    return newTrade; 
  },

  async updateTrade(trade,tradeId) {
    const oldTrade = await TradeModel.findOne({_id : tradeId});
    let changeFlag = 0;
    let propArray = ['ticker', 'noOfShares', 'price', 'typeOfTrade']
    for( i in propArray)
    {
      if(oldTrade[propArray[i]] != trade[propArray[i]]){
        changeFlag = 1;
        break;
      }
    }
    if(changeFlag === 0)
      return oldTrade;
    if(oldTrade.typeOfTrade !== "sell")
      await unBackChanges(oldTrade);
    const security = await SecurityModel.findOne({ticker : trade.ticker});
    let securityId = security._id;
    if(trade.typeOfTrade === "buy")
    { 
      await updateSecurity(security,trade);
    }
    const updatedTrade = TradeModel.findOneAndUpdate(
      {_id : tradeId},
      {$set : {...trade,securityId,'updatedAt' : new Date().toISOString()}},
      { new:true}
    )
    return updatedTrade;
  },

  async deleteTrade(tradeId) {
    const oldTrade = await TradeModel.findOne({_id : tradeId});
    if(oldTrade.typeOfTrade !== "sell")
      await unBackChanges(oldTrade);
    await TradeModel.findByIdAndDelete({_id : tradeId});
    return { tradeId };
  }
}

module.exports = TradeController;