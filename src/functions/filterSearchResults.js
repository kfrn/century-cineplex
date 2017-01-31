module.exports = filterSearchResults

function filterSearchResults(searchResults, country, genre, plot) {
  if (country !== 'any' && genre !== 'any' && plot === 'on') { // HAS country, HAS plot, HAS genre
    return searchResults.filter(elem => (elem.countries.includes(country) && elem.genres.includes(genre) && elem.plot !== 'unknown'))
  } else if (country !== 'any' && genre !== 'any' && plot !== 'on') { // HAS country, HAS genre; NO plot
    return searchResults.filter(elem => (elem.countries.includes(country) && elem.genres.includes(genre)))
  } else if (country !== 'any' && genre === 'any' && plot !== 'on') { // HAS country, NO genre; NO plot
    return searchResults.filter(elem => elem.countries.includes(country))
  } else if (country !== 'any' && genre === 'any' && plot === 'on') { // HAS country; NO genre, HAS plot
    return searchResults.filter(elem => (elem.countries.includes(country) && elem.plot !== 'unknown'))
  } else if (country === 'any' && genre !== 'any' && plot === 'on') { // NO country; HAS genre, HAS plot
    return searchResults.filter(elem => (elem.genres.includes(genre) && elem.plot !== 'unknown'))
  } else if (country === 'any' && genre === 'any' && plot === 'on') { // NO country, NO genre; HAS plot
    return searchResults.filter(elem => elem.plot !== 'unknown')
  } else if (country === 'any' && genre !== 'any' && plot !== 'on') { // NO country, HAS genre, NO plot
    return searchResults.filter(elem => elem.genres.includes(genre))
  } else if (country === 'any' && genre === 'any' && plot !== 'on') { // NO country; NO genre, NO plot
    return searchResults
  }
}
