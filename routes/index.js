var express = require('express');
var request = require('request');
var querystring = require('query-string');
var jsdom = require("jsdom");
var body = require('body-parser');
var router = express.Router();
const { JSDOM } = jsdom;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('404', { title: 'LKS' });
});

module.exports = router;
