let mongoose = require("mongoose");

let basketSchema = mongoose.Schema({
  customerID: String,
  basketDatetime: Date,
  status: String,
});

let basketModel = mongoose.model("Basket", basketSchema);

module.exports = basketModel;
