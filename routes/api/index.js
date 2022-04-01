var express = require("express");
var router = express.Router();

let routerCustomer = require("./customer");
let routerDashboard = require("./dashboard");

// Customer router
router.use("/customer", routerCustomer);

// Dashboard router
router.use("/dasboard", routerCustomer);

module.exports = router;
