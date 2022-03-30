const moment = require("moment");
const bcrypt = require("bcrypt");

const CustomerModel = require("../models/customer.model");

const registerCustomer = (req, res) => {
  try {
    // Create a hashed password before saving in the database
    let hashedPassword;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
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
            password: hash,
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
              message: "Customer Registered Successfully",
            });
          }
        });
      });
    });
  } catch {
    res.status(500).send();
  }
};

const loginCustomer = (req, res) => {
  CustomerModel.findOne(
    { username: req.body.username },
    "id login",
    (err, customer) => {
      if (err) {
        res.send(err);
      } else {
        bcrypt.compare(
          req.body.password,
          customer.login.password,
          (err, resBcrypt) => {
            if (resBcrypt === true) {
              res
                .status(200)
                .json({ id: customer.id, message: "Logged in successfully" });
            } else {
              res.send("Incorrect password");
            }
          }
        );
      }
    }
  );
};

module.exports = { registerCustomer, loginCustomer };
