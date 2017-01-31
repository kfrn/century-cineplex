var omdb = require('omdb')
var addFilmtoDB = require('./dbBasics').addFilmtoDB

module.exports = getFilmData

function getFilmData (id) {
  omdb.get({imdb: id}, true, function (err, res) {
    if (err) return console.error(err)
    if (!res) return console.log('Film not found!')

    var released = (res.released === null) ? '' : res.released.toString()
    var director = (res.director === null) ? '' : res.director
    var synopsis = (res.plot === null) ? '' : res.plot
    var genres = (res.genres.length === 0) ? 'no genre listed' : res.genres.join(', ')
    var country = (res.countries.length === 0) ? 'unknown' : res.countries.join(', ')

    var newFilm = {
      title: res.title,
      year: res.year,
      released: released,
      runtime: res.runtime,
      countries: country,
      genres: genres,
      director: director,
      writers: res.writers.join(', '),
      actors: res.actors.join(', '),
      plot: synopsis,
      posterURL: res.poster,
      IMDbID: res.imdb.id,
      type: res.type
    }
    // console.log(newFilm);

    addFilmtoDB(newFilm)
    .then(function (newFilm) {
      console.log('Film added')
    })
    .catch(function (error) {
      console.log(error)
    })
  })
}
