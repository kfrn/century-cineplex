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

function buildIMDbURL() {
  var currentDate = new Date
  var centuryAgo = currentDate.getFullYear() - 100
  var month = currentDate.getMonth()+1
  var lastDay
  if (month === 02) {
    lastDay = 28
  } else if (month === 04 || month === 06 || month === 09 || month === 11) {
    lastDay = 30
  } else {
    lastDay = 31
  }
  return "http://www.imdb.com/search/title?count=500&release_date=" + centuryAgo + "-" + month + "-01," + centuryAgo + "-" + month + "-" + lastDay + "&title_type=feature,documentary,short"
}

function getIMDbIDs() {
  getPage(buildIMDbURL())
    .then (function(result) {
      var IMDbURLs = extractURLs(result)
      var IMDbIDs = extractIDs(IMDbURLs)
      // console.log("The IMDbIDs are", IMDbIDs);
      console.log("The # of IMDbIDs is:", IMDbIDs.length)
    })
    .catch (function(error) {
      console.log(error);
    })
}
