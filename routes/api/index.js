var express = require("express");
var router = express.Router();

let routerCustomers = require("./customers");

router.use("/customers", routerCustomers);

module.exports = router;
