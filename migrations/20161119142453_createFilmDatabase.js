
exports.up = function(knex, Promise) {
  console.log("Initial table creation")

  return knex.schema.createTableIfNotExists("films", function(table) {
    table.increments('id')
    table.string('title')
    table.int('year')
    table.text('released')
    table.char('runtime')
    table.char('countries')
    table.char('genres')
    table.char('director')
    table.char('writers')
    table.char('actors')
    table.text('plot')
    table.char('posterURL')
    table.char('IMDbID')
    table.char('type')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("films").then(function() {
    console.log("Films table dropped")
  })
}
