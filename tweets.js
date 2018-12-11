// Given an array of sentence strings, findHaiku() looks for
// and returns a string that matches haiku grammar, if one exists.
function findHaiku(data, query, cb) {

  var tweets = JSON.parse(data).statuses
  var numTweets = tweets.length
  var foundHaiku = false
  var i = 0

  // for (var i = 0; i <= count - 1; i++) {
  while (foundHaiku == false) {

    if (i >= numTweets) {
      console.log('--possible re-poll oportunity--')
      cb({ "line1": "Could not find haiku...", "line2": "", "line3": "" })
      break
    }

    str = tweets[i].text
    haiku(str, function (err, data) {
      if (err) {
        console.error('Error! '.red, err)
        i++
      }
      else {
        console.log('Found haiku GOOD'.green)
        data.url = "http://twitter.com/" + tweets[i].user.screen_name + "/status/" + tweets[i].id_str
        console.log(data)
        data['q'] = query
        cb(data)
        foundHaiku = true
      }
    })
  }
}

module.exports = {
  findHaiku
}