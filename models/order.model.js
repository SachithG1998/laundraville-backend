let mongoose = require("mongoose");

let orderSchema = mongoose.Schema({
  customerID: String,
  status: String,
  statusMessage: String,
  datetimeOfOrder: Date,
});

let orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
