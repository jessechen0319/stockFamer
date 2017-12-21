var express = require('express');
var router = express.Router();

let jsonfile = require('jsonfile');
let DBPATH = __dirname+"/../server/data/data.json";

let fetch = require("../server/fetchService");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/getRecords_jesse', function(req, res, next) {
  res.json(jsonfile.readFileSync(DBPATH));
});

router.get('/newRecord_jesse', function(req, res, next) {
  let initialObj = {current:0, isHeaderHappened: false};
  initialObj.stock = req.query.stock;
  initialObj.price = req.query.price;
  initialObj.enterDate = req.query.enterDate;
  initialObj.dropLine = req.query.dropLine;
  let DB = jsonfile.readFileSync(DBPATH);
  DB.push(initialObj);
  jsonfile.writeFileSync(DBPATH, DB);
  res.json({isOK:true});
});

router.get('/test', function(req, res, next) {
  fetch.triggerFetch((result)=>{
    console.log('task end');
    console.log(JSON.stringify(result));
    res.json({"isOK":true});
  });
});

module.exports = router;
