var express = require('express')
var router = express.Router()

module.exports = router

var currentDate = new Date
var centuryAgo = currentDate.getFullYear() - 100
var locale = 'en-us'
var month = currentDate.toLocaleString(locale, {month: 'long'})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Century Cineplex', year: centuryAgo, month: month })
})

/* GET film page */
router.get('/film', function(req, res, next) {
  res.render('film', { title: 'tba'} )
})

/* GET film selection page */
router.get('/search', function(req, res, next) {
  res.render('search', { title: 'tba'} )
})

/* GET info page */
router.get('/info', function(req, res, next) {
  res.render('info', { year: centuryAgo, month: month } )
})
