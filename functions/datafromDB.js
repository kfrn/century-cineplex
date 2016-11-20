var Knex = require('knex')
var config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
var knex = Knex(config)

module.exports = {
  getFilms,
  getCountries
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


/* Raw SQL */
// SELECT * FROM "films" WHERE plot <> "none"
// SELECT * FROM "films" WHERE posterURL <> "none"
// SELECT * FROM "films" WHERE plot <> "none" OR posterURL <> "none"
