var express = require("express");
var router = express.Router();

let routerCustomer = require("./customer");
let routerDashboard = require("./dashboard");
let routerService = require("./service");
let routerBasket = require("./basket");

// Customer router
router.use("/customer", routerCustomer);

// Dashboard router
router.use("/dashboard", routerDashboard);

// Service router
router.use("/service", routerService);

// Basket router
router.use("/basket", routerBasket);

module.exports = router;
