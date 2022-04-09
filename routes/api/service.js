var express = require("express");
var router = express.Router();

const serviceController = require("../../controllers/service");

router.get("/", (req, res) => {
  res.send("Services endpoint responds successfully.");
});

router.get("/all", (req, res) => {
  serviceController.getServices(req, res);
});

router.get("/basket/:customerID", (req, res) => {
  serviceController.checkBasketForCustomer(req, res);
});

router.post("/basket/newBasket", (req, res) => {
  serviceController.createBasket(req, res);
});

router.post("/basket/addToBasket", (req, res) => {
  serviceController.addToBasket(req, res);
});

module.exports = router;
