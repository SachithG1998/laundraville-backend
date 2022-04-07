let mongoose = require("mongoose");

let basketItemsSchema = mongoose.Schema({
  basketID: String,
  serviceID: String,
  unitPrice: Number,
  quantity: Number,
});

let basketItemsModel = mongoose.model("BasketItems", basketItemsSchema);

module.exports = basketItemsModel;
