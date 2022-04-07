const BasketItemsModel = require("../models/basketItems.model");
const ServiceModel = require("../models/service.model");

const getBasketItems = async (req, res) => {
  let basketItemsJoined = new Array();

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
        basketItems.forEach((basketItem, index) => {
          ServiceModel.findById(
            basketItem.serviceID,
            "serviceName image unit",
            (err, service) => {
              if (err)
                return res.json({
                  statusMessage: "ERROR",
                  errorMessage: err,
                });
              else if (!service) {
                return res.json({
                  statusMessage: "NO_BASKET_ITEMS",
                  message: "Unable to fetch the basket items at this time",
                });
              } else {
                basketItemsJoined[index] = {
                  ...basketItem._doc,
                  service: service,
                };

                if (index === basketItems.length - 1) {
                  res.json({
                    statusMessage: "RETURNED_BASKET_ITEMS",
                    basketItems: basketItemsJoined,
                  });
                }
              }
            }
          );
        });
      }
    }
  );
};

module.exports = { getBasketItems };
