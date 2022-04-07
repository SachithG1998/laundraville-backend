let mongoose = require("mongoose");

let orderSchema = mongoose.Schema({
  customerID: Number,
  status: String,
  datetimeOfOrder: Date,
});

let orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
