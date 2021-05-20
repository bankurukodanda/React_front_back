var express = require('express');
var router = express.Router();
const logger = require('../utils/logger');
var fs = require("fs");
const path = require('path');
const axios = require('axios');
const https = require('https');
const proxyService = require('./proxyService');

/* GET home page. */
//var configProp = require('../config/properties/'+process.env.configFile);
router.get('/healthCheck', function(req, res){
  console.log("Healthg Check");
    res.send("Welcome to AX");
});

router.get('/health', function(req, res){
  console.log("Healthg Check");
    res.render("layout", {"body":"Welcome "});
});
router.use('/api', proxyService);

router.get('*', function(req, res){
  htmlBody = fs.readFileSync(path.normalize(path.join(__dirname, '../client/build/index.html')));
  res.render("layout",  {"body": htmlBody})
});
module.exports = router;
