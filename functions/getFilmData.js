var omdb = require('omdb')
var addFilmtoDB = require('./addFilmtoDB')

module.exports = getFilmData

function getFilmData(id) {
  omdb.get({imdb: id}, true, function(err, res) {
    if (err) return console.error(err)
    if (!res) return console.log("Film not found!")

    var released = (res.released === null) ? 'none' : res.released.toString()
    var runTime = (res.runtime === null) ? 'unknown' : res.runtime
    var director = (res.director === null) ? 'unknown' : res.director
    var synopsis = (res.plot === null) ? 'none' : res.plot
    var posterURL = (res.poster === null) ? 'none' : res.poster

    var newFilm = {
      title: res.title,
      year: res.year,
      released: released,
      runtime: runTime,
      countries: res.countries.join(", "),
      genres: res.genres.join(", "),
      director: director,
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
