const roomForm = document.querySelector('.room-form')
const username = document.querySelector('#username-input')
const roomName = document.querySelector('#room-input')

roomForm.addEventListener('submit', e => {
  const user = String(username.value).trim()
  const room = String(roomName.value).trim()
  
  if (user.length < 3 || room.length < 3) {
    e.preventDefault()
    alert('Username and Room name must be atleast 3 letters, Thanks!')
  }

})

