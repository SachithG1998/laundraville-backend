const CustomerModel = require("../models/customer.model");

const OrderModel = require("../models/order.model");
const OrderItemsModel = require("../models/orderItems.model");

const getCustomerById = (req, res) => {
  CustomerModel.findById(
    req.params.id,
    "name address dob phone email",
    (err, customer) => {
      if (err)
        res.json({
          statusMessage: "CUSTOMER_NOT_FOUND",
          message: "Error retrieving customer info. Please log in again.",
        });
      else {
        res.json({
          statusMessage: "CUSTOMER_FOUND",
          customer: customer,
        });
      }
    }
  );
};

const getOrderSummary = (req, res) => {
  if (req.params.customerID) {
    OrderModel.find({ customerID: req.params.customerID }, (err, orders) => {
      if (err) {
        res.json({
          statusMessage: "ERROR",
          message: err.toString(),
        });
      } else {
        if (orders) {
          let totalDue = 0;

          let ordersWithOrderItems = [];

          orders.forEach((order, ordersIndex) => {
            OrderItemsModel.find({ orderID: order._id }, (err, orderItems) => {
              if (err) {
                res.json({
                  statusMessage: "ERROR",
                  message: err.toString(),
                });
              } else {
                if (orderItems) {
                  let orderTotal = 0;

                  ordersWithOrderItems.push({
                    ...order._doc,
                  });

                  orderItems.forEach((orderItem, orderItemsIndex) => {
                    orderTotal += orderItem.unitPrice * orderItem.quantity;

                    try {
                      if (orderItemsIndex === orderItems.length - 1) {
                        ordersWithOrderItems[ordersIndex].orderTotal =
                          orderTotal;
                        ordersWithOrderItems[ordersIndex].orderItems =
                          orderItems;

                        totalDue += orderTotal;
                      }
                    } catch (e) {
                      console.log(e.toString());
                    }

                    if (ordersIndex === orders.length - 1) {
                      res.json({
                        totalDue: totalDue,
                        orders: ordersWithOrderItems,
                      });
                    }
                  });
                } else {
                  res.json({
                    statusMessage: "NO_ORDER_ITEMS",
                    message: "Error fetching order items",
                  });
                }
              }
            });
          });
        } else {
          res.json({
            statusMessage: "NO_ORDERS",
            message: "You have not placed any orders yet",
          });
        }
      }
    });
  } else {
    res.json({
      statusMessage: "NO_CUSTOMER_RECEIVED",
      message: "Customer ID not received",
    });
  }
};

module.exports = { getCustomerById, getOrderSummary };
