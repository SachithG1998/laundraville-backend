var express = require("express");
var router = express.Router();

/* Importing customers controller */
const customerController = require("../../controllers/customer");

/* Default customers route */
router.get("/", (req, res) => {
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

router.post("/updateInfo", (req, res) => {
  customerController.updateInfo(req, res);
});

module.exports = router;
