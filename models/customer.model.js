let mongoose = require("mongoose");

let customerSchema = mongoose.Schema({
  name: {
    firstName: String,
    lastName: String,
  },
  dob: Date,
  address: {
    line1: String,
    line2: String,
    postalCity: String,
    district: String,
  },
  phone: String,
  email: String,
  login: {
    username: String,
    password: String,
  },
});

let CustomerModel = mongoose.model("Customer", customerSchema);

module.exports = CustomerModel;
