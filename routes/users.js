var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {id:1, username:"Ashok"},
    {id:2, username:"Surya"}
  ]);
});

module.exports = router;
