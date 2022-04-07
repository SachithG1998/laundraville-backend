var express = require("express");
var router = express.Router();

// Importing dashboard controller
const dashboardController = require("../../controllers/dashboard");

router.get("/", (req, res) => {
  res.send("Dashboard endpoint responds successfully.");
});

router.get("/customer/:id", (req, res) => {
  dashboardController.getCustomerById(req, res);
});

module.exports = router;
