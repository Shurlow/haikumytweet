const expect = require('chai').expect
const makeHaiku = require('../haiku')

describe('Haiku', function () {
  it('generates a haiku from array of strings', function () {

    const validHaiku = 'This is a haiku. I love bananas a lot. Dont judge me my dude'
    const invalidhaiku = 'This is too damn short!'

    const haiku = makeHaiku(validHaiku, (err, result) => {
      console.log('Haiku?', err, result);
    })
    // expect(alpha).to.be.an.instanceof(Alpha)
  })
})