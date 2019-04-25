const Sequelize = require('sequelize')
const db = require('../db')

const Data = db.define('data', {
  dataYear: {
    type: Sequelize.INTEGER
  },
  propertyName: {
    type: Sequelize.STRING
  },
  zipcode: {
    type: Sequelize.INTEGER
  },
  communityArea: {
    type: Sequelize.STRING
  },
  energyUse: {
    type: Sequelize.INTEGER
  },
  totalGHGEmissions: {
    type: Sequelize.INTEGER
  }
})

module.exports = Data

/**
 * instanceMethods
 */
// User.prototype.correctPassword = function (candidatePwd) {
//   return User.encryptPassword(candidatePwd, this.salt()) === this.password()
// }

/**
 * classMethods
 */
// User.generateSalt = function () {
//   return crypto.randomBytes(16).toString('base64')
// }

/**
 * hooks
 */
// const setSaltAndPassword = user => {
//   if (user.changed('password')) {
//     user.salt = User.generateSalt()
//     user.password = User.encryptPassword(user.password(), user.salt())
//   }
// }

