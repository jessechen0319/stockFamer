var express = require('express');
var router = express.Router();

let jsonfile = require('jsonfile');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/getRecords', function(req, res, next) {
  res.json(jsonfile.readFileSync(__dirname+"/../server/data/data.json"));
});

module.exports = router;
