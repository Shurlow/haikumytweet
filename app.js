var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var colors = require('colors')
// var haiku = require('./haiku')
// var randomWords = require('random-words');
var oauth = require('oauth')
var Oauth = new oauth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    '<KEY>',
    '<SECRET>',
    '1.0',
    null,
    'HMAC-SHA1', null,
    {
      'Accept': '*/*',
      'Connection': 'close',
      'User-Agent': 'haikutweet/0.1.0'
    })

var app = express()
var port = process.env.PORT || 3001

app.set('views', __dirname + '/public')
app.set('view engine', 'hjs')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser())




app.get('/', function(req, res) {
  console.log('Hello from 3000')
  res.render('index.hjs')
})


app.post('/keyword', function(req, res) {

  var query = req.body.keyword
  var haiku = '...'
  console.log("\n----- New query:",query.blue)

  // url = params == null ? url : url + '?' + querystring.stringify();

  Oauth.get(
    'https://api.twitter.com/1.1/search/tweets.json?count=20&q='+query,
    '<KEY>',
    '<KEY>',
    function(err, data){
      if (err) {
        console.error(err)
        res.send(err)
      } else {
        console.log(data.statuses)
        findHaiku(data, query, function(H) {
          res.send(H)
        })
      }
    })
})




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
      cb({"line1":"Could not find haiku...", "line2":"", "line3":""})
      break
    }

    str = tweets[i].text
    haiku(str, function(err, data){
      if (err) {
        console.error('Error! '.red, err)
        i++
      }
      else {
        console.log('Found haiku GOOD'.green)
        data.url = "http://twitter.com/" +  tweets[i].user.screen_name + "/status/" + tweets[i].id_str
        console.log(data)
        data['q'] = query
        cb(data)
        foundHaiku = true
      }
    })
  }
}




app.listen(port)
