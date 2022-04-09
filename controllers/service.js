const ServiceModel = require("../models/service.model");
const BasketModel = require("../models/basket.model");
const BasketItemsModel = require("../models/basketItems.model");

const getServices = (req, res) => {
  ServiceModel.find((err, services) => {
    if (err)
      res.json({
        statusMessage: "ERROR",
        errorMessage: err,
      });
    else if (!services) {
      res.json({
        statusMessage: "NO_SERVICES",
        message: "Unable to fetch the services at this time",
      });
    } else {
      res.json({
        statusMessage: "RETURNED_SERVICES",
        services: services,
      });
    }
  });
};

const checkBasketForCustomer = (req, res) => {
  BasketModel.findOne({ customerID: req.params.customerID }, (err, basket) => {
    if (err) {
      res.json({
        statusMessage: "ERROR",
        errorMessage: err.toString(),
      });
    } else {
      if (basket) {
        return res.json({
          basketID: basket.id,
          basketExists: true,
        });
      } else {
        return res.json({
          basketExists: false,
        });
      }
    }
  });
};

const createBasket = (req, res) => {
  if (req.body.customerID) {
    BasketModel.find(
      {
        customerID: req.body.customerID,
      },
      (err, basket) => {
        if (err) {
          res.json({
            statusMessage: "ERROR",
            errorMessage: err.toString(),
          });
        } else {
          const newBasket = new BasketModel({
            customerID: req.body.customerID,
            basketDatetime: req.body.basketDatetime,
          });

          newBasket.save((err) => {
            if (err) {
              res.status(502).json({
                error: err.toString(),
              });
            } else {
              res.status(200).json({
                basketID: newBasket.id,
                statusMessage: "BASKET_CREATED_SUCCESSFULLY",
                message: "Basket created successfully",
              });
            }
          });
        }
      }
    );
  } else {
    res.send("No customer ID received");
  }
};

const addToBasket = (req, res) => {
  BasketItemsModel.findOne(
    {
      basketID: req.body.basketID,
      serviceID: req.body.serviceID,
    },
    (err, basketItem) => {
      if (err) {
        res.json({
          statusMessage: "ERROR",
          message: err.toString(),
        });
      } else {
        if (basketItem) {
          BasketItemsModel.findByIdAndUpdate(
            basketItem._id,
            {
              quantity: basketItem.quantity + req.body.quantity,
            },
            (err) => {
              if (err) {
                res.json({
                  statusMessage: "ERROR",
                  message: err.toString(),
                });
              } else {
                res.json({
                  statusMessage: "BASKET_ITEM_UPDATED_SUCCESSFULLY",
                  message: "Updated the basket item.",
                });
              }
            }
          );
        } else {
          newBasketItem = new BasketItemsModel({
            basketID: req.body.basketID,
            serviceID: req.body.serviceID,
            unitPrice: req.body.unitPrice,
            quantity: req.body.quantity,
          });

          newBasketItem.save((err) => {
            if (err) {
              return res.status(502).json({
                error: err.toString(),
              });
            } else {
              res.status(200).json({
                statusMessage: "BASKET_ITEM_ADDED_SUCCESSFULLY",
                message: "Service added to basket",
              });
            }
          });
        }
      }
    }
  );
};

module.exports = {
  getServices,
  createBasket,
  checkBasketForCustomer,
  addToBasket,
};
