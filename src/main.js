window.socket = io() // make socket global
const myapp = require('./lib/app')

// Set up asynchronous functions for all the backend functionality
const localApp = Object.keys(myapp).reduce((a, key) => {
  a[key] = async args => {
    socket.emit(key, args)
    return new Promise((res, rej) => {
      socket.on(key, response => {
        res(response)
      })
    })
  }
  return a
}, {})

console.log(localApp)

document.querySelector('#known-button').addEventListener('click', async () => {
  const currentThing = await localApp.returnSix()
  console.log(currentThing)
  // socket.emit('getInfo', 'known button clicked')
})

socket.emit('message', 'user connected')

socket.on('message', function(msg) {
  console.log(`Message: ${msg}`)
})
