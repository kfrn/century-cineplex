var getIMDbIDs = require('./getIMDbIDs')
var getFilmData = require('./getFilmData')

module.exports = populateDB

function populateDB() {
  getIMDbIDs.getPage("http://www.imdb.com/search/title?count=100&release_date=1916-01-01,1916-01-03&title_type=feature,short") // getIMDbIDs.buildIMDbURL()
    .then (function(result) {
      var IMDbURLs = getIMDbIDs.extractURLs(result)
      var IMDbIDs = getIMDbIDs.extractIDs(IMDbURLs)
      // console.log("The IMDbIDs are", IMDbIDs);
      console.log("The # of IMDbIDs is:", IMDbIDs.length)
      IMDbIDs.forEach(getFilmData)
    })
    .catch (function(error) {
      console.log(error);
    })
}

// populateDB()
