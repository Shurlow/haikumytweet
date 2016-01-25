// var request = require('superagent')

$(function() {

  var input = $('#keywordInput')
  var text1 = $('#text1')
  var text2 = $('#text2')
  var text3 = $('#text3')
  var query = $('#keyword')

  input.focus()

  input.on('keypress', function(e){

    if(e.keyCode === 13) {

      var input = $( this ).val()
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
        console.log(res)

        text1.text(res.line1)
        text2.text(res.line2)
        text3.text(res.line3)
        query.text('Keyword: ' + res.q)
      })

      $(this).val("")
      
    }
  })

})


