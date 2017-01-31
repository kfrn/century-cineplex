module.exports = deleteUnknowns

function deleteUnknowns (filmObj) {
  if (filmObj.plot === 'unknown') delete filmObj.plot
  if (filmObj.runtime === 'unknown') delete filmObj.runtime
  return filmObj
}
