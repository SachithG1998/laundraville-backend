var express = require("express");
var router = express.Router();

let routerCustomer = require("./customer");

router.use("/customer", routerCustomer);

module.exports = router;
