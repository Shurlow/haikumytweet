// var fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require("morgan");
const axios = require('axios')
const port = process.env.PORT || 3001

const app = express()
// app.set('views', __dirname + '/public')
// app.set('view engine', 'hjs')
// app.use(express.static(__dirname + '/public'))
// app.use(bodyParser())
app.use(bodyParser.json());
app.use(morgan('dev'))

// var haiku = require('./haiku')
// var randomWords = require('random-words');
// var oauth = require('oauth')
// var Oauth = new oauth.OAuth(
//     'https://api.twitter.com/oauth/request_token',
//     'https://api.twitter.com/oauth/access_token',
//     '<KEY>',
//     '<SECRET>',
//     '1.0',
//     null,
//     'HMAC-SHA1', null,
//     {
//       'Accept': '*/*',
//       'Connection': 'close',
//       'User-Agent': 'haikutweet/0.1.0'
//     })

const API_KEY = 'tUP9uIJDSIOpj4fS2ujOsb2ba'
const API_SECRET = 'VFmfHaete3JTTjPc2sdU83jF1rMqMO9MvylW0RnzNjPrwDGHrd'

app.get('/', function(req, res) {
  const search = req.query.search

  if (!search) return res.send('Welcome to Haiku My Tweet!')

  axios.get({
    url: 'https://api.twitter.com/1.1/tweets/search/30day/Prod.json',
    headers: { 'Authorization': "bearer " + token },
    data: {
      query: "keyword:pizza lang:en",
      maxResults: 3,
      // fromDate: "<YYYYMMDDHHmm>",
      // toDate: "<YYYYMMDDHHmm>"
    }
  }).then((result) => {
    console.log(result);
    
  })

    
})

app.use('/search', require('./routes.js'))

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
