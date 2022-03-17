let mongoose = require("mongoose");

let serviceSchema = mongoose.Schema({
  serviceID: Number,
  serviceName: String,
  price: Number,
});

let ServiceModel = mongoose.model("Service", customerSchema);

module.exports = ServiceModel;
