var omdb = require('omdb')
var addFilmtoDB = require('./dbBasics').addFilmtoDB
var clearDB = require('./dbBasics').clearDB

module.exports = getFilmData

function getFilmData(id) {
  omdb.get({imdb: id}, true, function(err, res) {
    if (err) return console.error(err)
    if (!res) return console.log("Film not found!")

    var released = (res.released === null) ? 'unknown' : res.released.toString()
    var runTime = (res.runtime === null) ? 'unknown' : res.runtime
    var director = (res.director === null) ? 'unknown' : res.director
    var synopsis = (res.plot === null) ? 'none' : res.plot
    var posterURL = (res.poster === null) ? 'none' : res.poster
    var country = (res.countries.length === 0) ? 'unknown' : res.countries.join(", ")

    var newFilm = {
      title: res.title,
      year: res.year,
      released: released,
      runtime: runTime,
      countries: country,
      genres: res.genres.join(", "),
      director: director,
      writers: res.writers.join(", "),
      actors: res.actors.join(", "),
      plot: synopsis,
      posterURL: posterURL,
      IMDbID: res.imdb.id,
      type: res.type
    }
    // console.log(newFilm);

    clearDB()

    addFilmtoDB(newFilm)
    .then(function(newFilm) {
      console.log("Film added")
    })
    .catch(function(error) {
      console.log(error)
    })
  })
}
