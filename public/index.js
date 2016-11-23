var titles = document.getElementsByClassName('filmtitle')
var keys = Object.keys(titles)
var htmlTitles = []

keys.forEach((key) => {
  htmlTitles.push(titles[key])
})


htmlTitles.forEach((title) => {
  title.onclick=() => {
    var filminfo = title.nextElementSibling
    filminfo.style.display == 'none' ? filminfo.style.display = 'block' : filminfo.style.display = 'none'
    console.log("title is", title)
    console.log("filminfo (sibling) is", filminfo)
  }
})
