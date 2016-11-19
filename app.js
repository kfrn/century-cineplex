var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var omdb = require('omdb')

var index = require('./routes/index')
var users = require('./routes/users')

var getIMDbIDs = require('./functions/getIMDbIDs')
var addFilmtoDB = require('./functions/addFilmtoDB')


var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/users', users)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// Get IMDbIDs (web scrape)
var IMDbIDs = getIMDbIDs()
// console.log("APP.JS: the IMDbIDs are", IMDbIDs)

// Call OMDB API
omdb.get({imdb: 'tt0006699'}, true, function(err, res) {
  if (err) return console.error(err)
  if (!res) return console.log("Film not found!")
  var newFilm = {
    title: res.title,
    year: res.year,
    released: res.released,
    released: res.runtime,
    countries: res.countries,
    genres: res.genres,
    director: res.director,
    writers: res.writers,
    actors: res.actors,
    plot: res.plot,
    posterURL: res.poster,
    IMDbID: res.imdb.id,
    type: res.type
  }
  console.log(newFilm)
})

module.exports = app
