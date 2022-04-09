const OrderModel = require("../models/order.model");
const OrderItemsModel = require("../models/orderItems.model");

const BasketModel = require("../models/basket.model");
const BasketItemsModel = require("../models/basketItems.model");

const moment = require("moment");

const placeOrder = (req, res) => {
  if (req.params.customerID) {
    const newOrder = new OrderModel({
      customerID: req.params.customerID,
      status: "ORDER_PLACED",
      statusMessage: "Order Placed",
      datetimeOfOrder: moment().format(),
    });

    newOrder.save((err) => {
      if (err) {
        res.status(502).json({
          statusMessage: "ERROR",
          message: err.toString(),
        });
      } else {
        BasketModel.findOne(
          { customerID: req.params.customerID },
          "_id",
          (err, basket) => {
            if (err) {
              res.status(502).json({
                statusMessage: "ERROR",
                message: err.toString(),
              });
            } else {
              if (basket) {
                console.log(basket);
                BasketItemsModel.find(
                  { basketID: basket._id },
                  (err, basketItems) => {
                    if (err) {
                      res.status(502).json({
                        statusMessage: "ERROR",
                        message: err.toString(),
                      });
                    } else {
                      console.log(basket);
                      if (basketItems) {
                        basketItems.forEach((basketItem, index) => {
                          const newOrderItem = new OrderItemsModel({
                            orderID: newOrder.id,
                            serviceID: basketItem.serviceID,
                            unitPrice: basketItem.unitPrice,
                            quantity: basketItem.quantity,
                          });

                          newOrderItem.save((err) => {
                            if (err) {
                              return res.status(502).json({
                                statusMessage: "ERROR",
                                message: err.toString(),
                              });
                            } else {
                              if (index === basketItems.length - 1) {
                                res.json({
                                  statusMessage: "ORDER_PLACED_SUCCESSFULLY",
                                  message:
                                    "The requested services are in process now",
                                });
                              }
                            }
                          });
                        });
                      } else {
                        res.json({
                          statusMessage: "UNABLE_TO_FETCH_BASKET_ITEMS",
                          message: "Unable to fetch basket items at this time",
                        });
                      }
                    }
                  }
                );
              } else {
                res.json({
                  statusMessage: "UNABLE_TO_FETCH_BASKET",
                  message: "Unable to fetch basket at this time",
                });
              }
            }
          }
        );
      }
    });
  } else {
    res.send("No Customer ID received");
  }
};

module.exports = { placeOrder };
