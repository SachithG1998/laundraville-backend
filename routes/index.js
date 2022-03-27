var express = require("express");
var router = express.Router();

/* Importing Routes for API and Web */
let routerAPI = require("./api/index");

/* Register Routes for API */
router.use("/api", routerAPI);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
