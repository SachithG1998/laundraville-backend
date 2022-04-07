let mongoose = require("mongoose");

let serviceSchema = mongoose.Schema({
  serviceName: String,
  unitPrice: Number,
  unit: String,
  image: String,
});

let ServiceModel = mongoose.model("Service", serviceSchema);

module.exports = ServiceModel;
