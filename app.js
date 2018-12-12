// var fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require("morgan");
const axios = require('axios')
require('dotenv').config()
const port = process.env.PORT || 3001
const app = express()

app.use(bodyParser.json());
app.use(morgan('dev'))

const token = process.env.TWITTER_TOKEN

app.get('/', function(req, res) {
  const search = req.query.search

  if (!search) return res.send('Welcome to Haiku My Tweet!')

  axios.get('https://api.twitter.com/1.1/search/tweets.json?q=pizza', {
    headers: { 'Authorization': "bearer " + token }
  }).then((result) => {
    console.log(result);
    res.send(200)
  })
  .catch(console.error)
    
})

// app.use('/search', require('./routes.js'))

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
