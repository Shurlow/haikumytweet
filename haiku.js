var CMUDict = require('cmudict').CMUDict
var cmu = new CMUDict()
var colors = require('colors')


module.exports = function makeHaiku(sentence, cb) {

  console.log('Input =', sentence)
  
  // sentence = sentence.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()(RT)\n]/g,"")
  sentence = sentence.replace(/[-\/#!$%\^&\*{}=\-_`~\n]/g,"")
  var words = sentence.split(" ")
  // console.log(words)
  var words_length = words.length
  var haikuObj = {
    "line1": '',
    "line2": '',
    "line3": ''
  }
  var lineIndex = [0]
  var sylTotal = 0
  var atLine = 1
  // var error = null
  var regexp = new RegExp('(@|(http)|(RT))')


  for (var i = 0; i <= words_length - 1; i++) {
    var w = words[i]
    //removes word if it is a 'mention'(@username), 'retweet'(RT) or link.
    if (regexp.test(w)) {
      // console.log('removed'.yellow, w)
      words.splice(i,1)
      words_length--
      i--
      continue
    }
    var syl = countSyllables(w)
    // console.log(w, syl)
    sylTotal += syl

    if (atLine == 1) {
      if (sylTotal == 5) {
        lineIndex[1] = i
        atLine++       
      }
      else if (sylTotal > 5) {
        // console.log('- Syllables did not match line 1')
        break
      }
    }

    else if (atLine == 2) {
      if (sylTotal == 12) {
        lineIndex[2] = i
        atLine++
      }
      else if (sylTotal > 12) {
        // console.log('- Syllables did not match line 2')
        break
      }
    }

    else {
      if (sylTotal == 17) {
        lineIndex[3] = i
        break
      }
      else if (sylTotal >= 17){
        break
      }
    }
  }

  if (sylTotal == 17) {
    // console.log('Did it!',lineIndex, 'Building String:')

    for (var i = 0; i <= lineIndex[3]; i++) {
      if (i <= lineIndex[1]) {
        haikuObj['line1'] += words[i] + ' '
      }
      else if (i <= lineIndex[2]) {
        haikuObj['line2'] += words[i] + ' '
      }
      else {
        if (i == lineIndex[3] && i < words_length - 1 && words[i].indexOf('.') == -1) {
          haikuObj['line3'] += words[i] + '...'
        }
        else {
          haikuObj['line3'] += words[i] + ' '
        }
      }
    }
    cb(null, haikuObj)
  }
  else {
    cb('Error, could not make haiku...', null)
  }






    // var success = false
    // at line 1 in haiku, total should be <= 5
//     if (atLine == 1) {
//       sylTotal += syl
//       if (sylTotal <= 5) {
//         haikuObj['line1'] = haikuObj['line1'] + w + ' '
//         if (sylTotal == 5) {
//           atLine = 2
//         }
//       }
//       else {
//         error = 'Big ass ERROR'
//         break
//       }
//     }
//     // at line 2 in haiku, total should be <= 12
//     else if (atLine == 2) {
//       sylTotal += syl
//       if (sylTotal <= 12) {
//         haikuObj['line2'] = haikuObj['line2'] + w + ' '
//         if (sylTotal == 12) {
//           atLine = 3
//         }
//       }
//       else {
//         error = 'Big ass ERROR'
//         break
//       }
//     }
//     // at line 3 in haiku, total should be <= 17
//     else if (atLine == 3) {
//       sylTotal += syl
//       if (sylTotal <= 17) {
//         haikuObj['line3'] = haikuObj['line3'] + w + ' '
//         if (sylTotal == 17) {
//           if (words.indexOf(w) < words.length) {
//             console.log(words)
//             haikuObj['line3'] += "..."
//           }
//           success = true
//           break
//         }
//       }
//       else {
//         error = 'Big ass ERROR'
//         break
//       }
//     }
//   }
//   if (success) {
//     cb(error, haikuObj)
//   } else {
//     cb('Error, too short', null)
//   }
// }

  // for (i in sentence) {
  //   w = sentence[i]
  //   syl = countSyllables(w)

  //   console.log('\nsyllables so far:', sylTotal)
  //   console.log('adding word:', w, syl)
    
  //   if ( sylTotal < 5 && sylTotal + syl <= 5) {
  //     console.log('OK')
  //     console.log(sylTotal)
  //     line1 = line1 + w + ' '
  //     sylTotal += syl
  //     // console.log(line1)
  //     // console.log(line2)
  //     // console.log(line3)
  //   }
  //   else if ( sylTotal < 12 && sylTotal + syl <= 12) {
  //     console.log('OK')
  //     line2 = line2 + w + ' '
  //     sylTotal += syl
  //     // console.log(line1)
  //     // console.log(line2)
  //     // console.log(line3)
  //   }
  //   else if ( sylTotal < 17 && sylTotal + syl <= 17) {
  //     console.log('OK')
  //     line3 = line3 + w + ' '
  //     sylTotal += syl
  //     // console.log(line1)
  //     // console.log(line2)
  //     // console.log(line3)
  //   }
  //   else {
  //     cb({'error': '!ERROR: Invalid input for haiku!'})
  //     break
  //   }

  // }

  // cb(null, haikuStr)
}


function constructHaiku(words, lineIndex) {
  console.log('constructing...')
  for (var i = 0; i < lineIndex[3]; i++) {
    console.log(i, words[i])
  }
}


function isVowel(char) {
  var vowels = ['a', 'e', 'i', 'o', 'u', 'y']
  if ( vowels.indexOf(char) >= 0 ) {
    return true
  }
  else {
    return false
  }
}


// Function takes a string input and counts the arpabet vowels/syllables using
// the CMU arpabet dictionary. Function defaults to basic syllable counter when
// word is not found in dictionary.
function countSyllables(word) {
  
  arpabetVowels = [
    'AO', 'AA', 'IY', 'UW', 'EH', // Monophthongs
    'IH', 'UH', 'AH', 'AX', 'AE',
    'EY', 'AY', 'OW', 'AW', 'OY', // Diphthongs
    'ER' // R-colored vowels
  ]

  var count = 0
  var phenList = []

  // get arpabet phenomes for given word from CMU dict
  var phenomes = cmu.get(word)

  // if cmu returned no phenomes for word, value is 'undefined', use 
  // basic syllable counter
  if (phenomes == undefined) {
    count = countSyllablesBasic(word)
  } else {
    // Strip stress values from arpabet output
    phenomes = phenomes.replace(/[0-2]/g, '')
    phenList = phenomes.split(' ')

    var len = phenList.length
    for (var i = 0; i <= len; i++) {
      phen = phenList[i]
      if( arpabetVowels.indexOf(phen) != -1 ) {
        count++
      }
    }
  }
  return count
}

function countSyllablesBasic(word) {
  var word = word.toLowerCase()
  var CharList = word.split('')
  var length = CharList.length
  var count = 0
  var lastVowel = false

  for (var i = 0; i < length; i++) {
    var c = CharList[i]
    // If char c is vowel
    if ( isVowel(c) ) {
      // and the last value was not a vowel
      if ( lastVowel == false ) {
        count++
        lastVowel = true
      }
      // if not, move on
    }
    else {
      lastVowel = false
    }
  }
  // Corrects for overcounting when word ends in 'e' and has more than 1 syllable.
  if ( CharList[length-1] == 'e' && count > 1) {
    count--
  }
  return count
}