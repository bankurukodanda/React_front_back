var express = require('express');
var router = express.Router();
// var configProp = require('../config/'+process.env.configFile);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {id:1, username:"Ashok"},
    {id:2, username:"Surya"}
  ]);
});

module.exports = router;
