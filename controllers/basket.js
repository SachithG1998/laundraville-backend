const BasketItemsModel = require("../models/basketItems.model");

const getBasketItems = (req, res) => {
  BasketItemsModel.find(
    { basketID: req.params.basketID },
    (err, basketItems) => {
      if (err)
        res.json({
          statusMessage: "ERROR",
          errorMessage: err,
        });
      else if (!basketItems) {
        res.json({
          statusMessage: "NO_BASKET_ITEMS",
          message: "Unable to fetch the basket items at this time",
        });
      } else {
        res.json({
          statusMessage: "RETURNED_BASKET_ITEMS",
          basketItems: basketItems,
        });
      }
    }
  );
};

module.exports = { getBasketItems };
