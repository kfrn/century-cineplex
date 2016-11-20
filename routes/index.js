var express = require('express')
var router = express.Router()

var getFilms = require('../functions/datafromDB').getFilms
var getCountries = require('../functions/datafromDB').getCountries

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
router.get('/film/', function(req, res, next) {
  getFilms()
    .then(function(req) {
      var randomFilm = req[Math.floor(Math.random() * req.length)]
      console.log("A random film is", randomFilm)
      console.log("number of results are ...", req.length)
      res.render('film', randomFilm)
    })
    .catch(function(error) {
      console.log(error)
    })
})

/* GET film selection page */
router.get('/search', function(req, res, next) {
  getCountries()
    .then(function(req) {
      var countryList = req.map((elem) => elem.countries)
      var data = {countryList: countryList, year: centuryAgo, month: month}
      console.log("data for search page is", data);
      res.render('search', data)
    })
    .catch(function(error) {
      console.log(error)
    })
})

/* GET info page */
router.get('/info', function(req, res, next) {
  res.render('info', { year: centuryAgo, month: month } )
})
