const BasketModel = require("../models/basket.model");
const BasketItemsModel = require("../models/basketItems.model");

const ServiceModel = require("../models/service.model");

const getBasketItems = (req, res) => {
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

const deleteBasketItemByID = (req, res) => {
  BasketItemsModel.deleteOne(
    {
      basketID: req.params.basketID,
      serviceID: req.params.serviceID,
    },
    (err) => {
      if (err) {
        res.json({
          status: "ERROR",
          statusMessage: err.toString(),
        });
      } else {
        res.json({
          status: "SUCCESSFULLY_DELETED_BASKET_ITEM",
          statusMessage: "Service deleted from basket.",
        });
      }
    }
  );
};

const deleteBasketByID = (req, res) => {
  BasketModel.findByIdAndDelete(req.params.basketID, (err) => {
    if (err) {
      res.json({
        statusMessage: "ERROR",
        message: err.toString(),
      });
    } else {
      BasketItemsModel.deleteMany(
        {
          basketID: req.params.basketID,
        },
        (err) => {
          if (err) {
            res.json({
              statusMessage: "ERROR",
              message: err.toString(),
            });
          } else {
            res.json({
              statusMessage: "SUCCESSFULLY_DELETED_BASKET",
              message: "Deleted basket",
            });
          }
        }
      );
    }
  });
};

module.exports = { getBasketItems, deleteBasketItemByID, deleteBasketByID };
