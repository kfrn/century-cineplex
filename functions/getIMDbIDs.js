var request = require('superagent')
var cheerio = require('cheerio')

var getFilmData = require('./getFilmData')

module.exports = {
  getPage,
  extractURLs,
  extractIDs,
  buildIMDbURL
}

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
  var month = currentDate.getMonth() + 1
  var lastDay
  if (month === 02) {
    lastDay = 28
  } else if (month === 04 || month === 06 || month === 09 || month === 11) {
    lastDay = 30
  } else {
    lastDay = 31
  }
  var URL = `http://www.imdb.com/search/title?count=1500&release_date=${centuryAgo}-${month}-01,${centuryAgo}-${month}-${lastDay}&title_type=feature,short`
  // console.log(URL);
  return URL
}
