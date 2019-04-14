const expect = require('chai').expect
const { countSyllables, makeHaiku } = require('../haiku')

describe('countSyllables', function() {
  it('count syllables of words in cmu dictionary', function() {
    expect(countSyllables('alligator')).to.equal(4)
    expect(countSyllables('light')).to.equal(1)
    expect(countSyllables('banana')).to.equal(3)
  })
})

describe('Haiku', function () {
  it('generates a haiku from array of strings', function (done) {

    const validHaiku = 'This is a haiku. I love bananas a lot. Dont judge me my dude'
    const validOutput = [
      'This is a haiku.',
      'I love bananas a lot.',
      'Dont judge me my dude'
    ]
    // const invalidhaiku = 'This is too damn short!'

    const haiku = makeHaiku(validHaiku)
    console.log('--- DONE ---', haiku)
    expect(haiku).to.eql(validOutput)
    done()
  })
})