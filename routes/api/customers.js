var express = require("express");
var router = express.Router();

/* Importing customers controller */
const customersController = require("../../controllers/customers");

/* Default customers route */
router.get("/", function (req, res) {
  res.send("Customer request endpoint responds successfully");
});

/* Customer registration endpoint */
router.post("/register", (req, res) => {
  customersController.registerCustomer(req, res);
});

module.exports = router;
