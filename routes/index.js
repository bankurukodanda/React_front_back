var express = require('express');
var router = express.Router();
const logger = require('../utils/logger');
var fs = require("fs");
const path = require('path');
const axios = require('axios');
const https = require('https');
const usersRouter = require('./users');

/* GET home page. */
//var configProp = require('../config/properties/'+process.env.configFile);
router.get('/healthCheck', function(req, res){
    res.send("Welcome to AX");
});
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', usersRouter);

module.exports = router;
