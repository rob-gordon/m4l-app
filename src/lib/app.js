const wait = require('waait')

const myapp = {
  getInfo: args => {
    return 1010101010101
  },
  returnSix: async args => {
    await wait(1000)
    return 'Max'
  }
}

module.exports = myapp
