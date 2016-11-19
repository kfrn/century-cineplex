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
  console.log("test")
  return knex('films').del()
}
