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

function getSearchResults(country, genre, plot) {
  if (country != 'any' && genre != 'any' && plot == 'on') { // HAS country, HAS plot, HAS genre
    return knex('films')
    .where('countries', '=', country)
    .andWhere('genres', 'like', '%' +  genre + '%')
    .andWhere('plot', '<>', '')
  } else if (country != 'any' && genre != 'any' && plot != 'on') { // HAS country, HAS genre; NO plot
      return knex('films')
      .where('countries', '=', country)
      .andWhere('genres', 'like', '%' +  genre + '%')
  } else if (country != 'any' && genre == 'any' && plot != 'on') { // HAS country, NO genre; NO plot 
      return knex('films')
      .where('countries', '=', country)
  } else if (country != 'any' && genre == 'any' && plot == 'on') { // HAS country; NO genre, HAS plot
      return knex('films')
      .where('countries', '=', country)
      .andWhere('plot', '<>', '')
  } else if (country == 'any' && genre != 'any' && plot == 'on') { // NO country; HAS genre, HAS plot
      return knex('films')
      .andWhere('genres', 'like', '%' +  genre + '%')
      .andWhere('plot', '<>', '')
  } else if (country == 'any' && genre == 'any' && plot == 'on') { // NO country, NO genre; HAS plot
      return knex('films')
      .andWhere('plot', '<>', '')
  } else if (country == 'any' && genre != 'any' && plot != 'on') { // NO country, HAS genre, NO plot
      return knex('films')
      .andWhere('genres', 'like', '%' +  genre + '%')
  } else if (country == 'any' && genre == 'any' && plot != 'on') { // NO country; NO genre, NO plot
      return knex('films')
  }
}

/* Raw SQL */
// SELECT * FROM 'films' WHERE countries = 'USA' AND genres LIKE 'drama' AND plot <> '''
