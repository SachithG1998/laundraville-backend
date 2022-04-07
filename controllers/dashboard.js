const CustomerModel = require("../models/customer.model");

const getCustomerById = (req, res) => {
  CustomerModel.findById(
    req.params.id,
    "name address dob phone email",
    (err, customer) => {
      if (err)
        res.json({
          statusMessage: "CUSTOMER_NOT_FOUND",
          message: "Error retrieving customer info. Please log in again.",
        });
      else {
        res.json({
          statusMessage: "CUSTOMER_FOUND",
          customer: customer,
        });
      }
    }
  );
};

module.exports = { getCustomerById };
