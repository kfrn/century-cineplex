var request = require('superagent')
var cheerio = require('cheerio')

module.exports = getIMDbIDs

function getPage(url) {
  return new Promise (function (resolve, reject) {
    request
    .get(url)
    .end(function (error, res) {
      if (error) {
        reject(error)
      } else {
        resolve(res.text)
      }
    })
  })
}

function extractURLs(html) {
  $ = cheerio.load(html)
  var listURLs = []
  URLs = $('.lister-item-header a').each(function() {
    listURLs.push($(this).attr('href'))
  })
  return listURLs
}

function extractIDs(arrayofURLs) {
  var IMDbIDs = arrayofURLs.map(elem => elem.match(/tt\d+/))
  return IMDbIDs.map(elem => elem[0])
}

function getIMDbIDs() {
  getPage("http://www.imdb.com/search/title?release_date=1895-01-01,1895-06-30&sort=year,asc&sound_mixes=silent")
    .then (function(result) {
      var IMDbURLs = extractURLs(result)
      var IMDbIDs = extractIDs(IMDbURLs)
      console.log("The IMDbIDs are:", IMDbIDs)
    })
    .catch (function(error) {
      console.log(error);
    })
}
