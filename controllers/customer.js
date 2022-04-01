const moment = require("moment");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const CustomerModel = require("../models/customer.model");

const registerCustomer = (req, res) => {
  const found = CustomerModel.find(
    {
      $or: [
        { "login.username": req.body.username },
        { email: req.body.email },
        { phone: req.body.phone },
      ],
    },
    (err, customer) => {
      if (err) {
        console.log(err);
      } else {
        return res.json({
          statusMessage: "CUSTOMER_EXISTS",
          message:
            "You have already registered to Laundraville. Please Log In.",
        });
      }
    }
  );

  if (!found) {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) res.send(err);
      else {
        let newCustomer = new CustomerModel({
          name: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
          },
          dob: new Date(
            moment(req.body.dob, "YYYY-MM-DD").format("YYYY/MM/DD")
          ),
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
            password: hashedPassword,
          },
        });

        newCustomer.save((err) => {
          if (err) {
            res.status(502).json({
              error: err.toString(),
            });
          } else {
            res.status(200).json({
              id: newCustomer.id,
              statusMessage: "CUSTOMER_REGISTERED_SUCCESSFULLY",
              message: "Customer Registered Successfully",
            });
          }
        });
      }
    });
  }
};

module.exports = { registerCustomer };
