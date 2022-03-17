let mongoose = require("mongoose");

let orderSchema = mongoose.Schema({
  orderID: Number,
  customerID: Number,
  serviceID: Number,
  datetime: Date,
});

let orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
