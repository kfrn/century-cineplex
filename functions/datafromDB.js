var Knex = require('knex')
var config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
var knex = Knex(config)

module.exports = {
  getFilms,
  getCountries,
  getGenres
}

function getFilms() {
  return knex('films')
          .where('posterURL', '<>', 'none')
          .orWhere('plot', '<>', '')
}

function getCountries() {
  return knex('films')
          .distinct('countries')
          // .select()
}

function getGenres() {
  return knex('films')
          .distinct('genres')
}

// getGenres()
//   .then(function(req) {
//     var genreList = req.map((elem) => elem.genres).join(', ').split(", ").filter((item, idx, self) => idx == self.indexOf(item)).sort()
//     console.log(genreList)
//
//   })
//   .catch(function(error) {
//     console.log(error)
//   })

function getSearchResults(country, genre, hasPlot) {
  var operator = (hasPlot) ? '<>' : '='
  return knex('films')
          .where('countries', '=', country)
          .andWhere('genres', 'like', genre)
          .andWhere('plot', operator, '')
}

getSearchResults('USA', 'drama', true)
  .then(function(req) {
    var randomFilm = req[Math.floor(Math.random() * req.length)]
    console.log(randomFilm);
  })
  .catch(function(error) {
    console.log(error)
  })


/* Raw SQL */
// SELECT * FROM 'films' WHERE countries = 'USA' AND genres LIKE 'drama' AND plot <> '' AND posterURL LIKE 'http%'
