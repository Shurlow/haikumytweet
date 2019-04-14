// var CMUDict = require('cmudict').CMUDict
// var cmu = new CMUDict()
// var colors = require('colors')

const dictionary = require('./dict/cmudict.json')

function countSyllables(word) {
  const wordUp = word.toUpperCase().replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()\n]/g, "")
  const phonemes = dictionary[wordUp]
  console.log(wordUp, phonemes);
  
  const digits = phonemes.match(/\d/g)
  return digits.length
}

function findSyllableIndex(words, lineSyllables) {

  let sylCount = 0
  let endIndex = -1

  for (let i = 0; i < words.length; i++) {
    const syllables = countSyllables(words[i])
    sylCount += syllables
    console.log('Counting:', sylCount, words[i]);
    
    if(sylCount >= lineSyllables) {
      console.log('-- Break', i);
      
      endIndex = i
      break
    }
  }

  if (sylCount > lineSyllables) {
    return -1
  }

  return endIndex
}


function makeHaiku(sentence) {
  
  // sentence.split(' ').reduce((word) => {

  // }, 0)

  let words = sentence.split(' ')

  const haiku = [5,7,5].map(lineSyllables => {
    const index = findSyllableIndex(words, lineSyllables) + 1
    const line = words.slice(0, index).join(' ')
    words = words.slice(index)
    return line
  })

  return haiku
  

  let currLine = 0

  while(words.length) {
    const word = words.shift()
    const syllables = countSyllables(word)
    // const syllableLeft = haiku[currLine].sylTotal - syllables
    haiku[currLine].text += `${word} `
    haiku[currLine].sylTotal -= syllables
    console.log(haiku, currLine)

    if (haiku[currLine].sylTotal === 0) {
      if (currLine < 2) {
        currLine++
      } else {
        break
      }
    }

    if (haiku[currLine].sylTotal < 0) {
      return { error: 'Invalid syllable count' }
    }
  }

  // console.log(haiku)
  return haiku


  /*
    let words = split sentence

    for each word
      count syllables
      increment line sylable total


  */

}

// module.exports = function makeHaiku(sentence) {

//   console.log('Input =', sentence)
  
//   // sentence = sentence.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()(RT)\n]/g,"")
//   sentence = sentence.replace(/[-\/#!$%\^&\*{}=\-_`~\n]/g,"")
//   var words = sentence.split(" ")
//   // console.log(words)
//   var words_length = words.length
//   var haikuObj = {
//     "line1": '',
//     "line2": '',
//     "line3": ''
//   }
//   var lineIndex = [0]
//   var sylTotal = 0
//   var atLine = 1
//   // var error = null
//   var regexp = new RegExp('(@|(http)|(RT))')


//   for (var i = 0; i <= words_length - 1; i++) {
//     var w = words[i]
//     //removes word if it is a 'mention'(@username), 'retweet'(RT) or link.
//     if (regexp.test(w)) {
//       // console.log('removed'.yellow, w)
//       words.splice(i,1)
//       words_length--
//       i--
//       continue
//     }
//     var syl = countSyllables(w)
//     // console.log(w, syl)
//     sylTotal += syl

//     if (atLine == 1) {
//       if (sylTotal == 5) {
//         lineIndex[1] = i
//         atLine++       
//       }
//       else if (sylTotal > 5) {
//         // console.log('- Syllables did not match line 1')
//         break
//       }
//     }

//     else if (atLine == 2) {
//       if (sylTotal == 12) {
//         lineIndex[2] = i
//         atLine++
//       }
//       else if (sylTotal > 12) {
//         // console.log('- Syllables did not match line 2')
//         break
//       }
//     }

//     else {
//       if (sylTotal == 17) {
//         lineIndex[3] = i
//         break
//       }
//       else if (sylTotal >= 17){
//         break
//       }
//     }
//   }

//   if (sylTotal == 17) {
//     // console.log('Did it!',lineIndex, 'Building String:')

//     for (var i = 0; i <= lineIndex[3]; i++) {
//       if (i <= lineIndex[1]) {
//         haikuObj['line1'] += words[i] + ' '
//       }
//       else if (i <= lineIndex[2]) {
//         haikuObj['line2'] += words[i] + ' '
//       }
//       else {
//         if (i == lineIndex[3] && i < words_length - 1 && words[i].indexOf('.') == -1) {
//           haikuObj['line3'] += words[i] + '...'
//         }
//         else {
//           haikuObj['line3'] += words[i] + ' '
//         }
//       }
//     }
//     // cb(null, haikuObj)
//     return haikuObj
//   }
//   else {
//     return { error: 'Could not make haiku...' }
//   }
// }


function constructHaiku(words, lineIndex) {
  console.log('constructing...')
  for (var i = 0; i < lineIndex[3]; i++) {
    console.log(i, words[i])
  }
}


function isVowel(char) {
  // var vowels = ['a', 'e', 'i', 'o', 'u', 'y']
  const vowels = {
    a: true,
    e: true,
    i: true,
    o: true,
    u: true,
    y: true,
  }

  return vowels[char]
}


// Function takes a string input and counts the arpabet vowels/syllables using
// the CMU arpabet dictionary. Function defaults to basic syllable counter when
// word is not found in dictionary.
// function countSyllables(word) {
  
//   arpabetVowels = [
//     'AO', 'AA', 'IY', 'UW', 'EH', // Monophthongs
//     'IH', 'UH', 'AH', 'AX', 'AE',
//     'EY', 'AY', 'OW', 'AW', 'OY', // Diphthongs
//     'ER' // R-colored vowels
//   ]

//   var count = 0
//   var phenList = []

//   // get arpabet phenomes for given word from CMU dict
//   var phenomes = cmu.get(word)

//   // if cmu returned no phenomes for word, value is 'undefined', use 
//   // basic syllable counter
//   if (phenomes == undefined) {
//     count = countSyllablesBasic(word)
//   } else {    
//     // Strip stress values from arpabet output
//     phenomes = phenomes.replace(/[0-2]/g, '')
//     phenList = phenomes.split(' ')

//     var len = phenList.length
//     for (var i = 0; i <= len; i++) {
//       phen = phenList[i]
//       if( arpabetVowels.indexOf(phen) != -1 ) {
//         count++
//       }
//     }
//   }
//   return count
// }

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

module.exports = {
  countSyllables,
  makeHaiku
}