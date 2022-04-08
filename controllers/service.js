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
  if (req.params.customerID) {
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
                id: newBasket.id,
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

const saveBasketItem = (req, res) => {
  BasketItemsModel.deleteMany({ basketID: req.params.basketID }, (err) => {
    if (err) console.log(err);
    else if (req.body.basketItems) {
      let newBasketItem;
      let errors = false;

      req.body.basketItems.forEach((basketItem) => {
        newBasketItem = new BasketItemsModel({
          basketID: basketItem.basketID,
          serviceID: basketItem.serviceID,
          unitPrice: basketItem.unitPrice,
          quantity: basketItem.quantity,
        });

        newBasketItem.save((err) => {
          if (err) {
            return res.status(502).json({
              error: err.toString(),
            });
          }
        });
      });

      if (!errors) {
        res.status(200).json({
          statusMessage: "BASKET_ITEM_ADDED_SUCCESSFULLY",
          message: "Service added to basket",
        });
      }
    } else {
      res.json({
        statusMessage: "NO_BASKET_ITEM",
        message: "Please select a service to add to your basket",
      });
    }
  });
};

module.exports = {
  getServices,
  createBasket,
  checkBasketForCustomer,
  saveBasketItem,
};
