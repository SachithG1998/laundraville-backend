var express = require("express");
var router = express.Router();

/* Importing customers controller */
const customerController = require("../../controllers/customer");

/* Default customers route */
router.get("/", function (req, res) {
  res.send("Customer request endpoint responds successfully");
});

/* Customer registration endpoint */
router.post("/register", (req, res) => {
  customerController.registerCustomer(req, res);
});

/* Customer login endpoint */
router.post("/login", (req, res) => {
  customerController.loginCustomer(req, res);
});

module.exports = router;
