const path = require('path')
const Max = require('max-api')
global.Max = Max
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3000
const myapp = require('./src/lib/app')

app.use(express.static('dist'))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})

// const backendApp = {
//   getInfo:
// }

io.on('connection', function(socket) {
  socket.on('message', function(msg) {
    Max.post(`Message: ${msg}`)
  })

  Object.keys(myapp).forEach(key => {
    socket.on(key, async args => {
      Max.post(`Called: ${key}`)
      const result = await myapp[key](args)
      io.emit(key, result)
    })
  })

  io.emit('message', 'You connected!')
})

http.listen(port, function() {
  console.log('listening on *:' + port)
})

// Max.addHandler('message', () => {
//   Max.post('Somehow I got the message here???')
// })
