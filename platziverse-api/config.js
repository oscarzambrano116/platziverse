'use strict'

const debug = require('debug')('platziverse:api:db')

module.exports = {
  db: {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || 'admin',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: msg => debug(msg),
  },
  auth: {
    secret: process.env.SECRET || 'platzi',
  }
}