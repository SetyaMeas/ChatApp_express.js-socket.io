const express = require('express')
const router = express.Router()

const homePage = require('../controllers/homeController')
const chatPage = require('../controllers/chatController')

router.get('/home', homePage)
router.post('/chat', chatPage)

module.exports = router