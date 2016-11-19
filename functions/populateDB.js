var getIMDbIDs = require('./getIMDbIDs')
var getFilmData = require('./getFilmData')

module.exports = populateDB

function populateDB() {
  getIMDbIDs.getPage(getIMDbIDs.buildIMDbURL()) // 
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
