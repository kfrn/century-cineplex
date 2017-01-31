const express = require('express')
const router = express.Router()
const request = require('superagent')

module.exports = router

const currentDate = new Date
const centuryAgo = currentDate.getFullYear() - 100
const locale = 'en-us'
const shortMonth = currentDate.toLocaleString(locale, {month: 'short'})
const longMonth = currentDate.toLocaleString(locale, {month: 'long'})

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Century Cineplex', year: centuryAgo, month: longMonth })
})

/* GET random film page */
router.get('/random/', (req, res, next) => {
  request.get('http://cinema-1917-api.herokuapp.com/api/v1/films')
    .query({ releaseMonth: shortMonth })
    .end((error, result) => {
      if (error) {
        res.render('error', error)
      }
      if (result) {
        var filmResults = result.body.results
        var hasPlotOrPoster = filmResults.filter(elem => elem.plot !== 'unknown' || elem.posterURL !== null)
        var randomFilm = hasPlotOrPoster[Math.floor(Math.random() * hasPlotOrPoster.length)]
        console.log(`There are ${filmResults.length} results total, only ${hasPlotOrPoster.length} of which have either a poster URL or plot summary. Here's a random pick from that ${hasPlotOrPoster.length}.`)
        console.log({randomFilm})
        res.render('randomfilm', randomFilm)
      }
  })
})


// BELOW HERE NOT REWRITTEN!!!!!


/* GET film selection page */
router.get('/search', function(req, res, next) {
  getCountries()
    .then(function(req) {
      var countryList = req.map((elem) => elem.countries)
      countryList = countryList.join(" ").replace(/\,/g, '').split(" ").sort().filter((item, idx, self) => idx == self.indexOf(item))
      countryList.unshift('any')
      var data = {countryList: countryList, year: centuryAgo, month: month}
      getGenres()
        .then(function(req) {
          var genreList = req.map((elem) => elem.genres).join(', ').split(", ").filter((item, idx, self) => idx == self.indexOf(item)).sort()
          genreList.unshift('any')
          data.genres = genreList
          // console.log("data is .....",data)
          res.render('search', data)
        })
    })
    .catch(function(error) {
      console.log(error)
    })
})

/* GET film result page */
router.get('/filmresult', function(req, res, next) {
  getSearchResults(req.query.country, req.query.genre, req.query.plot)
    .then(function(results) {
      var randomFilm = results[Math.floor(Math.random() * results.length)]
      if (randomFilm === undefined) {
        res.render('noresult')
        console.log("No results!");
      }
      else if (req.query.submission === 'singlefilm') {
        var filmData = {randomFilm: randomFilm, country: req.query.country, genre: req.query.genre, plot: req.query.plot}
        console.log("results are", filmData);
        res.render('result', filmData)
      }
      else if (req.query.submission === 'filmlist') {
        var filmListData = {filmList: results, country: req.query.country, genre: req.query.genre, plot: req.query.plot}
        console.log("filmListData are", filmListData);
        res.render('resultlist', filmListData)
      }
    })
    .catch(function(error) {
      console.log(error)
    })
})
