var titles = document.getElementsByClassName('filmtitle')
var titlekeys = Object.keys(titles)
var htmlTitles = []


titlekeys.forEach((key) => htmlTitles.push(titles[key]))

htmlTitles.forEach((title) => {
  title.onclick=() => {
    var filminfo = title.nextElementSibling
    hideAllFilmInfo()
    filminfo.style.display == 'block' ? filminfo.style.display = 'none' : filminfo.style.display = 'block'
  }
})

function hideAllFilmInfo() {
  var filminfo = document.getElementsByClassName('filminfo')
  var filminfokeys = Object.keys(filminfo)
  var filminfoelements = []
  filminfokeys.forEach((key) => filminfoelements.push(filminfo[key]))
  filminfoelements.forEach((eachinfo) => eachinfo.style.display = 'none')
}
