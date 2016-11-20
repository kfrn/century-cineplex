var express = require('express');
var router = express.Router();

var currentDate = new Date
var centuryAgo = currentDate.getFullYear() - 100
var locale = 'en-us'
var month = currentDate.toLocaleString(locale, {month: 'long'})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Century Cineplex', year: centuryAgo, month: month });
});

module.exports = router;
