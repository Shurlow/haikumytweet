// var request = require('superagent')

$(function() {

  var input = $('#keywordInput')
  var text1 = $('#text1')
  var text2 = $('#text2')
  var text3 = $('#text3')
  var query = $('#keyword')
  var loadimg = $('#loadimg')
  var twiturl = $('#twiturl')

  var url = null

  $.ajax({
        url: '/random',
        method: 'POST',
      })
      .done(function(res) {

        // console.log(res.line1)
        // console.log(res.line2)
        console.log(res)
        // loadimg.hide()

        text1.text(res.line1)
        text2.text(res.line2)
        text3.text(res.line3)
        // query.text(res.q)
        input.val(res.q)
      })


  input.focus(function() {
    $(this).val("")
  })

  twiturl.click(function(e) {
    console.log('URL:', url)
    if (url !== null) {
      window.open(url)
    }
  })


  input.on('keypress', function(e){

    if(e.keyCode === 13) {

      var input = $( this ).val()

      text1.text("...")
      text2.text("...")
      text3.text("...")
      var inputHTML = "<p class='response'>" + input + "</p>"

      var data = {
        'keyword': input
      }

      $.ajax({
        url: '/keyword',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data)
      })
      .done(function(res) {

        // console.log(res.line1)
        // console.log(res.line2)
        console.log(res.url)
        // loadimg.hide()
        url = res.url

        text1.text(res.line1)
        text2.text(res.line2)
        text3.text(res.line3)
        // query.text(res.q)
        // input.val(res.q) 
      })

      // $(this).val("")
      
    }
  })

})


