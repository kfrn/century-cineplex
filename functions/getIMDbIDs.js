var request = require('superagent')
var cheerio = require('cheerio')

module.exports = {
  getPage,
  extractURLs
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
