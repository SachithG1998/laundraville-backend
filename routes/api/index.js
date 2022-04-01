var express = require("express");
var router = express.Router();

let routerCustomers = require("./customer");

router.use("/customer", routerCustomers);

module.exports = router;
