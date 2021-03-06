const express = require("express");
const router = express.Router();
const axios = require('axios')
const makeHaiku = require('./haiku')
const token = process.env.TWITTER_TOKEN

router.get('/:query', function (req, res) {
  const search = req.params.query
  const count = req.query.limit || 10

  if (!search) return res.send('Welcome to Haiku My Tweet!')

  axios.get(`https://api.twitter.com/1.1/search/tweets.json?q=${search}&lang=en&count=${count}`, {
    headers: { 'Authorization': "bearer " + token }
  }).then((result) => {
    // console.log(result.data.statuses);
    const haikus = result.data.statuses.map(t => makeHaiku(t.text))
    res.send(haikus)
  }).catch((err) => {
    console.error(err)
    res.status(500).send('Unable to get tweets.')
  })
})

module.exports = router