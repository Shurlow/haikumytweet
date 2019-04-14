const fs = require('fs')

const dictTxt = fs.readFileSync(__dirname + '/cmudict-0.7b.txt', 'utf-8')

const words = dictTxt.split('\n').filter(w => !w.startsWith(';'))
  .reduce((dict, w) => {
    const idx = w.indexOf(' ')
    const key = w.slice(0, idx)
    const syllables = w.slice(idx + 2)
    dict[key] = syllables
    return dict
  }, {})

fs.writeFileSync(__dirname + '/cmudict.json', JSON.stringify(words))

