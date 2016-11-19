var omdb = require('omdb')
var addFilmtoDB = require('./addFilmtoDB')


module.exports = getFilmData

function getFilmData() {
  omdb.get({imdb: 'tt0006744'}, true, function(err, res) {
    if (err) return console.error(err)
    if (!res) return console.log("Film not found!")

    var runTime = (res.runtime === null) ? 'unknown' : res.runtime
    var posterURL = (res.poster === null) ? 'none' : res.poster
    var synopsis = (res.plot === null) ? 'none' : res.plot

    var newFilm = {
      title: res.title,
      year: res.year,
      released: res.released.toString(),
      runtime: runTime,
      countries: res.countries.join(", "),
      genres: res.genres.join(", "),
      director: res.director,
      writers: res.writers.join(", "),
      actors: res.actors.join(", "),
      plot: synopsis,
      posterURL: posterURL,
      IMDbID: res.imdb.id,
      type: res.type
    }

    addFilmtoDB(newFilm)
    .then(function(newFilm) {
      console.log("Film added")
    })
    .catch(function(error) {
      console.log(error)
    })
  })
}
