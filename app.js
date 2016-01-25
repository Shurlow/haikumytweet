var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var colors = require('colors')
var haiku = require('./haiku')
var randomWords = require('random-words');
var oauth = require('oauth')
var Oauth = new oauth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    '4WqSd4NKuRN6h6KspsbNAHhDq',
    'ZJt1ufogxSf66SLr1wbYiW9NLChKQVypfL8FVLNn2bvOEvfcuq',
    '1.0',
    null,
    'HMAC-SHA1', null,
    {
      'Accept': '*/*',
      'Connection': 'close',
      'User-Agent': 'haikutweet/0.1.0' 
    })
// var querystring = require('querystring')
// var util = require('util')
// var T = require('twitter')
// var twit = new T({
//   consumer_key: '4WqSd4NKuRN6h6KspsbNAHhDq',
//   consumer_secret: 'ZJt1ufogxSf66SLr1wbYiW9NLChKQVypfL8FVLNn2bvOEvfcuq',
//   access_token_key: '2320992961-DPRXx6kiVsGt7g0bHqG014mGpEomiwXG0J5q4ok',
//   access_token_secret: 'd5PizJ3umW4jUx1XPBN1Q4CShS5sZ8ceLCx5yS05yeHFf'
// })
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
    '2320992961-DPRXx6kiVsGt7g0bHqG014mGpEomiwXG0J5q4ok',
    'd5PizJ3umW4jUx1XPBN1Q4CShS5sZ8ceLCx5yS05yeHFf',
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

  // var query = 'pizza'
  // twit.get('https://api.twitter.com/1.1/search/tweets.json', { q: query } , function(data, response) {
  //     console.log(response.statusCode)
  //     tweets = data
  //     console.log(data)



  //     // findHaiku

  //     // if (tweets != undefined){
  //     //   haiku = findHaiku(tweets, function(H) {
  //     //     res.send(H)
  //     //   })
  //     // }
  // })
})

app.post('/random', function(req, res) {
  var word = randomWords(1)
  console.log(word)

  Oauth.get(
    'https://api.twitter.com/1.1/search/tweets.json?count=20&q='+word,
    '2320992961-DPRXx6kiVsGt7g0bHqG014mGpEomiwXG0J5q4ok',
    'd5PizJ3umW4jUx1XPBN1Q4CShS5sZ8ceLCx5yS05yeHFf',
    function(err, data){
      if (err) {
        console.error(err)
        res.send(err)
      } else {
        findHaiku(data, word, function(H) {
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