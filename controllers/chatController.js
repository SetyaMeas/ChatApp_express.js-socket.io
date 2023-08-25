
const chatController = (req, res) => {
  const username = String(req.body.username).trim()
  const roomName = String(req.body.roomName).trim()

  if (username.length >= 3 && roomName.length >= 3) {
    res.render('chat.ejs', { username: username, roomName: roomName })
  } else {
    res.redirect('/home')
  }
}

module.exports = chatController