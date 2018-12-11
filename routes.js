var express = require("express");
var router = express.Router();

router.post('/', function (req, res) {

  var query = req.body.keyword
  console.log(query);
  
  // var haiku = '...'
  // console.log("\n----- New query:", query.blue)

  // url = params == null ? url : url + '?' + querystring.stringify();

  // Oauth.get(
  //   'https://api.twitter.com/1.1/search/tweets.json?count=20&q=' + query,
  //   '<KEY>',
  //   '<KEY>',
  //   function (err, data) {
  //     if (err) {
  //       console.error(err)
  //       res.send(err)
  //     } else {
  //       console.log(data.statuses)
  //       findHaiku(data, query, function (H) {
  //         res.send(H)
  //       })
  //     }
    // })
})

module.exports = router