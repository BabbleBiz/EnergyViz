const Sequelize = require('sequelize')
const db = require('../db')

const Data = db.define('data', {
  year: {
    type:Sequelize.INTEGER
  },
  dataId: {
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  zipcode: {
    type: Sequelize.INTEGER
  },
  neighborhood: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  floorarea: {
    type: Sequelize.INTEGER
  },
  yearbuilt: {
    type: Sequelize.INTEGER
  },
  numbuildings: {
    type: Sequelize.INTEGER
  },
  energystarscore: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      notEmpty: false
    },
  },
  electricityuse: {
    type: Sequelize.INTEGER
  },
  naturalgas: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      notEmpty: false
    },
  },
  energyperfoot: {
    type: Sequelize.INTEGER
  },
  weatherenergyperfoot: {
    type: Sequelize.INTEGER
  },
  totalghg: {
    type: Sequelize.INTEGER
  },
  latitude: {
    type: Sequelize.FLOAT
  },
  longitude: {
    type: Sequelize.FLOAT
  }
})

module.exports = Data


// const Data = db.define('data', {
//   dataYear: {
//     type: Sequelize.INTEGER
//   },
//   propertyName: {
//     type: Sequelize.STRING
//   },
//   zipcode: {
//     type: Sequelize.INTEGER
//   },
//   communityArea: {
//     type: Sequelize.STRING
//   },
//   energyUse: {
//     type: Sequelize.INTEGER
//   },
//   totalGHGEmissions: {
//     type: Sequelize.INTEGER
//   }
// })


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

