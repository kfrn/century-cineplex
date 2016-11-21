var Knex = require('knex')
var config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
var knex = Knex(config)

module.exports = {
  getFilms,
  getCountries,
  getGenres,
  getSearchResults
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

function getSearchResults(country, genre) {
  return knex('films')
          .where('countries', '=', country)
          .andWhere('genres', 'like', genre)
}

/* Raw SQL */
// SELECT * FROM 'films' WHERE countries = 'USA' AND genres LIKE 'drama' AND plot <> '''
