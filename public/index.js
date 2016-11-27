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
  var filtered = filminfoelements.filter((elem) => elem.style.display = 'block')
  console.log(filtered.length, "length of elements with display 'block' is")
  console.log("filtered is", filtered)
  filtered.length !== 0 ? true : false
}


// function expandCollapse() {
//   if ( anyExpanded() ) { // Check if any elements are detected to have "display: 'block'"
//     console.log("Something is expanded, therefore collapse all")
//     hideAllFilmInfo()
//   } else {
//     console.log("Nothing is expanded, therefore expand all")
//     expandAllFilmInfo()
//   }
// }
