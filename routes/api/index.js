var express = require("express");
var router = express.Router();

let routerCustomer = require("./customer");
let routerDashboard = require("./dashboard");
let routerService = require("./service");
let routerBasket = require("./basket");
let routerOrder = require("./order");

// Customer router
router.use("/customer", routerCustomer);

// Dashboard router
router.use("/dashboard", routerDashboard);

// Service router
router.use("/service", routerService);

// Basket router
router.use("/basket", routerBasket);

// Order router
router.use("/order", routerOrder);

module.exports = router;
