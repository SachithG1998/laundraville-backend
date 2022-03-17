let mongoose = require("mongoose");

let customerSchema = mongoose.Schema({
  customerID: Number,
  name: {
    firstName: String,
    lastName: String,
  },
  dob: Date,
  address: {
    line1: String,
    line2: String,
    postalCity: String,
  },
  phone: String,
  gender: String,
  login: {
    username: String,
    password: String,
  },
});

let CustomerModel = mongoose.model("Customer", customerSchema);

module.exports = CustomerModel;
