//models/Expense.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dealerSchema = new Schema({
  cards: String,
  score: Number,
});
module.exports = mongoose.model('Dealer', dealerSchema);
