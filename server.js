const express = require('express')
const http = require('http')
const ws = require('socket.io')

const app = express()
const server = http.createServer(app)
const PORT = 3001 || process.env.PORT
const io = ws(server)

const { checkRoom, userLeftRoom } = require('./controllers/serverController')
const { users, rooms, room } = require('./data/data')

// application
const application = require('./app')
application(app)

// web socket
io.on('connection', socket => {

  socket.on('userInfo', data => {
    checkRoom(socket, data)
    socket.broadcast.emit('memberJoinRoom', { name: data.name, room: data.room})

    if (rooms[data.room].users.length === 1) {
      socket.emit('adminJoinRoom', { name: data.name, room: data.room, admin: true })
    } else {
      socket.emit('adminJoinRoom', { name: data.name, room: data.room, admin: false })
    }   
  });

  socket.on('msg', (data) => {
    const msg = String(data).trim()

    if (msg.length > 0) {
      socket.broadcast.emit('msg', { 
        msg: msg, 
        name: users[socket.id], 
        room: room[socket.id] 
      })
    }
  });

  socket.on('disconnect', () => {    
    socket.broadcast.emit('leaveRoom', { 
      name: users[socket.id], 
      room: room[socket.id] 
    })

    userLeftRoom(socket)
  });

});


server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))
