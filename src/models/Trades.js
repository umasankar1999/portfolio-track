const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tradesSchema = new Schema({
  securityId : { type: mongoose.ObjectId, required: true },
  ticker : { type: String, required: true },
  noOfShares : { type: Number, required: true },
  price : { type: Number, required: true },
  typeOfTrade : { type: String, required: true },
  createdAt : {type : Date, required: true},
  updatedAt : Date
});

const Trades = mongoose.model('Trades',tradesSchema);

module.exports = Trades;