var Knex = require('knex')
var config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
var knex = Knex(config)

module.exports = {
  getFilms
}

function getFilms() {
  return knex('films')
          .where('posterURL', '<>', 'none')
          .orWhere('plot', '<>', '')
}



/* Raw SQL */
// SELECT * FROM "films" WHERE plot <> "none"
// SELECT * FROM "films" WHERE posterURL <> "none"
// SELECT * FROM "films" WHERE plot <> "none" OR posterURL <> "none"
