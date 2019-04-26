const db = require('../db')
const Data = require('./data')

// register models
require('.')

module.exports = {
  db,
  Data
}
