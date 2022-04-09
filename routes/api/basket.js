var express = require("express");
var router = express.Router();

const basketController = require("../../controllers/basket");

router.get("/all/:basketID", (req, res) => {
  basketController.getBasketItems(req, res);
});

router.get("/delete/service/:basketID/:serviceID", (req, res) => {
  basketController.deleteBasketItemByID(req, res);
});

router.get("/delete/:basketID", (req, res) => {
  basketController.deleteBasketByID(req, res);
});

module.exports = router;
