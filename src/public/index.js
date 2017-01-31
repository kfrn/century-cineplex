var titles = document.getElementsByClassName('filmtitle')
var titlekeys = Object.keys(titles)
var htmlTitles = []


titlekeys.forEach((key) => htmlTitles.push(titles[key]))

htmlTitles.forEach((title) => {
  title.onclick=() => {
    var filminfo = title.nextElementSibling
    // hideAllFilmInfo()
    filminfo.style.display == 'block' ? filminfo.style.display = 'none' : filminfo.style.display = 'block'
  }
})


var filminfo = document.getElementsByClassName('filminfo')
var filminfokeys = Object.keys(filminfo)
var filminfoelements = []

function hideAllFilmInfo() {
  filminfokeys.forEach((key) => filminfoelements.push(filminfo[key]))
  filminfoelements.forEach((eachinfo) => eachinfo.style.display = 'none')
}

function expandAllFilmInfo() {
  filminfokeys.forEach((key) => filminfoelements.push(filminfo[key]))
  filminfoelements.forEach((eachinfo) => eachinfo.style.display = 'block')
}


function anyExpanded() {
  var filtered = filminfoelements.filter((elem) => elem.style.display == 'block')
  if ( filtered.length !== 0 ) {
    return true
  } else {
    return false
  }
}


function expandCollapse() {
  if ( anyExpanded() ) {
    hideAllFilmInfo()
  } else {
    expandAllFilmInfo()
  }
}


function loadingMessage() {
  var loading = document.getElementById('loading')
  var loaded = document.getElementById('loaded')
  console.log("loading, loaded", loading, loaded)
  loading.style.display = 'none'
  loaded.style.display = 'block'
}

setTimeout(loadingMessage, 15000)
