var Knex = require('knex')
var config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
var knex = Knex(config)

module.exports = {
  addFilmtoDB,
  clearDB
}

function addFilmtoDB(film) {
  return knex('films').insert(film)
}

function clearDB() {
  console.log("deleting existing films from DB")
  return knex('films').del()
  // return knex.raw('DELETE FROM "main"."films"')
}

clearDB()
  .then(function() {
    console.log("database cleared");
  })
  .catch(function(error) {
    console.log(error)
  })
