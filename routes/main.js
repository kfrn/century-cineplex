const express = require('express')
const router = express.Router()
const request = require('superagent')

const filterSearchResults = require('../functions/filterSearchResults')
const deleteUnknowns = require('../functions/deleteUnknowns')

const currentDate = new Date()
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
      if (error) res.render('error', error)
      if (result) {
        var filmResults = result.body.results
        var hasPlotOrPoster = filmResults.filter(elem => elem.plot !== 'unknown' || elem.posterURL !== null)
        var randomFilm = hasPlotOrPoster[Math.floor(Math.random() * hasPlotOrPoster.length)]
        randomFilm = deleteUnknowns(randomFilm)
        console.log(`There are ${filmResults.length} results total, only ${hasPlotOrPoster.length} of which have either a poster URL or plot summary. Here's a random pick from that ${hasPlotOrPoster.length}.`)
        // console.log({randomFilm})
        res.render('randomfilm', randomFilm)
      }
    })
})

/* GET film selection page */
router.get('/search', (req, res, next) => {
  request.get('http://cinema-1917-api.herokuapp.com/api/v1/countries')
    .end((err, countries) => {
      if (err) res.render('error', err)
      if (countries) {
        var countryList = countries.body.countryList
        countryList.unshift('any')
        request.get('http://cinema-1917-api.herokuapp.com/api/v1/genres')
          .end((error, genres) => {
            if (error) res.render('error', error)
            if (genres) {
              var genreList = genres.body.genres
              genreList.unshift('any')
              var data = {countryList: countryList, genres: genreList, year: centuryAgo, month: longMonth}
              res.render('search', data)
            }
          })
      }
    })
})

/* GET film result page */
router.get('/filmresult', (req, res, next) => {
  request.get('http://cinema-1917-api.herokuapp.com/api/v1/films')
    .query({ releaseMonth: shortMonth })
    .end((error, result) => {
      if (error) res.render('error', error)
      if (result) {
        var plot = req.query.plot
        if (plot === undefined) plot = 'off'
        var searchMatches = filterSearchResults(result.body.results, req.query.country, req.query.genre, plot)
        var randomMatch = searchMatches[Math.floor(Math.random() * searchMatches.length)]
        if (randomMatch === undefined) res.render('noresult')
        else if (req.query.submission === 'singlefilm') {
          var randomFilm = deleteUnknowns(randomMatch)
          var filmData = {randomFilm: randomFilm, country: req.query.country, genre: req.query.genre, plot: plot}
          console.log(filmData);
          res.render('result', filmData)
        } else if (req.query.submission === 'filmlist') {
          var mappedMatches = searchMatches.map(deleteUnknowns)
          var filmListData = {filmList: mappedMatches, country: req.query.country, genre: req.query.genre, plot: plot}
          // console.log(filmListData);
          res.render('resultlist', filmListData)
        }
      }
    })
})

module.exports = router
