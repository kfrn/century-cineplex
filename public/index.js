// Expand all function

var filminfo = document.getElementsByClassName('filminfo')
var filminfokeys = Object.keys(filminfo)
var filminfoelements = []

function hideAllFilmInfo () {
  filminfokeys.forEach((key) => filminfoelements.push(filminfo[key]))
  filminfoelements.forEach((eachinfo) => eachinfo.style.display = 'none')
}

function expandAllFilmInfo () {
  filminfokeys.forEach((key) => filminfoelements.push(filminfo[key]))
  filminfoelements.forEach((eachinfo) => eachinfo.style.display = 'block')
}

function anyExpanded () {
  var filtered = filminfoelements.filter((elem) => elem.style.display === 'block')
  if (filtered.length !== 0) {
    return true
  } else {
    return false
  }
}

function expandCollapse () {
  if (anyExpanded()) {
    hideAllFilmInfo()
  } else {
    expandAllFilmInfo()
  }
}
