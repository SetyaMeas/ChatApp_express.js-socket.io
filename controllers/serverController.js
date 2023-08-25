const { users, rooms, room } = require('../data/data')

async function checkRoom(socket, data) {
  users[socket.id] = data.name
  room[socket.id] = data.room
  const existedRoom = rooms[data.room] // true or false
  
  if (!existedRoom) {
    rooms[data.room] = {
      users: [socket.id],
      msg: [] // we haven't use this 'msg' variable yet
    }
  } else {     
    rooms[data.room].users.push(socket.id)
  }
}

async function userLeftRoom(socket) {
  const roomName = await room[socket.id]
  rooms[roomName].users = await rooms[roomName].users.filter(id => id !== socket.id)
  
  if (rooms[roomName].users.length === 0) {
    delete rooms[roomName]
  }
  delete users[socket.id]
}

module.exports = { checkRoom, userLeftRoom }