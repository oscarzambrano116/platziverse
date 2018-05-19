'use strict'

const debug = require('debug')('platziverse:api:routes')
const http = require('http')
const chalk = require('chalk')
const express = require('express')
const asyncify = require('express-asyncify')

const api = require('./api')

const port = process.env.PORT || 3001
// const app = express()
const app = asyncify(express())
const server = http.createServer(app)

app.use('/api', api)

// Express error handler
app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ err: err.message })
  }

  res.status(500).send({ error: err.message })
})

function handleFatalError (err) {
  console.log(`${chalk.red('[fatal error]')} ${err.message}`)
  console.log(err.stack)
  process.exit(1)
}

if (!module.parent) {
  process.on('uncaughtException', handleFatalError)
  process.on('unhandleRejection', handleFatalError)

  server.listen(port, () => {
    console.log(`${chalk.green('[platziverse-api]')} server listening on port ${port}`)
  })
}

module.exports = server
