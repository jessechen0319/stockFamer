var express = require('express');
var router = express.Router();

let jsonfile = require('jsonfile');
let DBPATH = __dirname + "/../server/data/seeds.json";

let fetch = require("../server/fetchService");
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('seeds');
});

router.get('/getAllSeeds', function (req, res, next) {
    res.json(jsonfile.readFileSync(DBPATH));
});

module.exports = router;