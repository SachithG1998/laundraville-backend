let mongoose = require("mongoose");

let orderItemsSchema = mongoose.Schema({
  orderID: String,
  serviceID: Number,
  unitPrice: Number,
  quantity: Number,
});

let orderItemsModel = mongoose.model("OrderItems", orderItemsSchema);

module.exports = orderItemsModel;
