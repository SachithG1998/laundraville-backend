var express = require("express");
var router = express.Router();

const orderController = require("../../controllers/order");

router.post("/placeOrder/:customerID", (req, res) => {
  orderController.placeOrder(req, res);
});

module.exports = router;
