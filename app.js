const express = require('express')

const application = (app) => {

  // middlewares
  app.set('view engine', 'ejs')
  app.use(express.static('public'))
  app.use(express.urlencoded({ extended: false }))

  // get routes
  const router = require('./routes/index')

  // routes
  app.use('/', router)
  app.all('*', (req, res) => {
    res.status(404).send('404 not found')
  })
}


module.exports = application
