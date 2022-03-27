const moment = require("moment");
const mongoose = require("mongoose");

const CustomerModel = require("../models/customer.model");

const registerCustomer = (req, res) => {
  let newCustomer = new CustomerModel({
    name: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    },
    dob: new Date(moment(req.body.dob, "YYYY-MM-DD").format("YYYY/MM/DD")),
    address: {
      line1: req.body.addressLine1,
      line2: req.body.addressLine2,
      postalCity: req.body.postalCity,
      district: req.body.district,
    },
    phone: req.body.phone,
    email: req.body.email,
    login: {
      username: req.body.username,
      password: req.body.password,
    },
  });

  newCustomer.save((err) => {
    if (err) {
      res.status(502).send({
        error: err.toString(),
      });
    } else {
      res.status(200).send({
        id: newCustomer.id,
        message: "Customer Registered Successfully",
      });
    }
  });
};

module.exports = { registerCustomer };
