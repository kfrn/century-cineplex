var Knex = require('knex')
var config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
var knex = Knex(config)

module.exports = {
  getRandomFilm
}

function getRandomFilm() {
  return knex('films')
          .where('posterURL', '<>', 'none')
          .orWhere('plot', '<>', 'none')
}


getRandomFilm()
  .then(function(res) {
    var randomFilm = res[Math.floor(Math.random() * res.length)]
    console.log("A random film is", randomFilm)
    console.log("number of results are ...", res.length)
  })
  .catch(function(error) {
    console.log(error)
  })


/* Raw SQL */
// SELECT * FROM "films" WHERE plot <> "none"
// SELECT * FROM "films" WHERE posterURL <> "none"
// SELECT * FROM "films" WHERE plot <> "none" OR posterURL <> "none"
