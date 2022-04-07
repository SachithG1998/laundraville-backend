var express = require("express");
var router = express.Router();

const basketController = require("../../controllers/basket");

router.get("/all/:basketID", (req, res) => {
  basketController.getBasketItems(req, res);
});

module.exports = router;
