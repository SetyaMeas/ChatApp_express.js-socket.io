const express = require('express')
const { join } = require('path')

const application = (app) => {

  // middlewares
  app.set('view engine', 'ejs')
  app.use(express.static(join(__dirname, 'public')))
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