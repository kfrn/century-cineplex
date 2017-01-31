var getIMDbIDs = require('./getIMDbIDs')
var getFilmData = require('./getFilmData')

module.exports = populateDB

function populateDB () {
  getIMDbIDs.getPage(getIMDbIDs.buildIMDbURL()) //
    .then(function (result) {
      var IMDbURLs = getIMDbIDs.extractURLs(result)
      var IMDbIDs = getIMDbIDs.extractIDs(IMDbURLs)
      // console.log("The IMDbIDs are", IMDbIDs);
      console.log(`This month, there were ${IMDbIDs.length} films`)
      IMDbIDs.forEach(getFilmData)
    })
    .catch(function (error) {
      console.log(error)
    })
}
