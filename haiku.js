// var colors = require('colors')

const syllable = require('syllable')
const dictionary = require('./dict/cmudict.json')

function makeHaiku(sentence) {
  let words = sentence.split(' ')

  // const haiku = [5, 7, 5].map(lineSyllables => {
  //   console.log('__ working on:', words)
  //   const index = findSyllableIndex(words, lineSyllables)
  //   const line = words.slice(0, index + 1).join(' ')
  //   words = words.slice(index + 1)
  //   console.log('LINE:', line, index, words);
    
  //   return line
  // })

  const haiku = [5, 7, 5]

  for (let i = 0; i < haiku.length; i++) {
    const lineSyllables = haiku[i]
    const idx = findSyllableIndex(words, lineSyllables)
    if (idx === -1) return null // unable to find syllables means haiku is invalid

    haiku[i] = words.slice(0, idx + 1).join(' ')
    words = words.slice(idx + 1)
    // console.log('LINE:', haiku, idx, words);
  }

  return haiku
}

function countSyllables(word) {
  const wordUp = word.toUpperCase().replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()\n]/g, "")
  const phonemes = dictionary[wordUp]
  // console.log(wordUp, phonemes, syllable(word));
  return phonemes ? phonemes.match(/\d/g).length : syllable(word)
}

function findSyllableIndex(words, lineSyllables) {

  let sylCount = 0
  let endIndex = -1

  for (let i = 0; i < words.length; i++) {
    const syllables = countSyllables(words[i])
    sylCount += syllables
    
    if(sylCount >= lineSyllables) {
      endIndex = i
      break
    }
  }

  if (sylCount > lineSyllables) {
    return -1
  }

  return endIndex
}

module.exports = {
  countSyllables,
  makeHaiku
}