const expect = require('chai').expect
const { countSyllables, makeHaiku } = require('../haiku')

describe('countSyllables', function() {
  it('count syllables of words in cmu dictionary', function() {
    expect(countSyllables('alligator')).to.equal(4)
    expect(countSyllables('light')).to.equal(1)
    expect(countSyllables('banana')).to.equal(3)
  })
})

describe('makeHaiku', function () {
  it('generates a haiku from array of strings', function (done) {

    const validHaiku = 'This is a haiku. I love bananas a lot. Dont judge me my dude'
    const validOutput = [
      'This is a haiku.',
      'I love bananas a lot.',
      'Dont judge me my dude'
    ]
    // const invalidhaiku = 'This is too damn short!'

    const haiku = makeHaiku(validHaiku)
    expect(haiku).to.eql(validOutput)
    done()
  })

  it('should return null if input string is too short', function() {
    const shortString1 = 'This is too damn short!'
    const shortString2 = ''

    expect(makeHaiku(shortString1)).to.equal(null)
    expect(makeHaiku(shortString2)).to.equal(null)
  })

  it('should return null if input string is too large', function() {
    const longString = 'This is haiku fits well. But it is still bad. Definitley too long I think. hmmm'
    expect(makeHaiku(longString)).to.equal(null)
  })
})