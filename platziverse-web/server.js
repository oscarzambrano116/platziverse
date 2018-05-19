'use strict'

const debug = require('debug')('platziverse:web')
const http = require('http')
const path = require('path')
const express = require('express')
const asyncify = require('express-asyncify')
const socketio = require('socket.io')
const chalk = require('chalk')
const PlatziverseAgent = require('platziverse-agent')

const proxy = require('./proxy')
const { pipe } = require('./utils')

const port = process.env.PORT || 8080
const app = asyncify(express())
const server = http.createServer(app)
const io = socketio(server)
const agent = new PlatziverseAgent()

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', proxy)

// Socket.io
io.on('connect', socket => {
  debug(`Connected ${socket.id}`)

  pipe(agent, socket)

  /*
  agent.on('agent/message', payload => {
    socket.emit('agent/message', payload)
  })

  agent.on('agent/connected', payload => {
    socket.emit('agent/connected', payload)
  })

  agent.on('agent/disconnected', payload => {
    socket.emit('agent/disconnected', payload)
  })
  */
})

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

process.on('uncaughtException', handleFatalError)
process.on('unhandleRejection', handleFatalError)

server.listen(port, () => {
  console.log(`${chalk.green('[platziverse-web]')} server listening on port ${port}`)
  agent.connect()
})
