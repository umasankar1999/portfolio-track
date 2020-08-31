const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const securitiesSchema = new Schema({
  companyName : { type: String, required: true },
  ticker : { type: String, required: true, unique: true },
  avgBuyPrice : { type: Number, required: true },
  quantity : { type: Number, required: true },
  createdAt : {type : Date, required: true},
  updatedAt : Date
});

const Securities = mongoose.model('Securities',securitiesSchema);

module.exports = Securities;