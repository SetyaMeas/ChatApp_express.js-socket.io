const socket = io();
const msgForm = document.querySelector('.msg-form');
const msgInput = document.querySelector('#msg-input');
const username = document.querySelector('#username');
const roomName = document.querySelector('#roomName');
const showMsg = document.querySelector('.show-msg');

const user = { 
  name: username.innerHTML, 
  room: roomName.innerHTML 
}

// ws
socket.on('connection')
socket.emit('userInfo', user) // send user information to server

socket.on('memberJoinRoom', data => {
  if (data.room === user.room) {
    appendMsg(`
    <p>${data.name} join the room</p>
    `, "join-room")
  }
});

socket.on('adminJoinRoom', data => {
  if (data.room === user.room) {
    if (data.admin) {
      appendMsg(`
      <p>You created the room</p>
      `, "created-room")
    } else {
      appendMsg(`
      <p>You join the room</p>
      `, "join-room")
    }
  }
})

socket.on('leaveRoom', data => {
  if (data.room === user.room ) {
    appendMsg(`
    <p>${data.name} left the room</p>
    `, "left-room")
  }
})

socket.on('msg', data => {
  if (data.room === user.room) {
  appendMsg(`
    <p id="name">${data.name}</p>
    <p id="text">${data.msg}</p>
  `, "member-msg")
  }
})

msgForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const msg = String(msgInput.value).trim()

  if (msg.length !== 0) {
    socket.emit('msg', msg)
    appendMsg(`
    <p id="name">You</p>
    <p id="text">${msg}</p>
    `, "sender-msg")
  } 
  
  msgInput.value = ""
});

function appendMsg(msg, id) {
  const msgElement = document.createElement('div')
  msgElement.id = id;
  msgElement.innerHTML = msg
  showMsg.append(msgElement)
}
