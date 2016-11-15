var request = require('superagent')

module.exports = {
  getPage
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
