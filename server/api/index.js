'use strict'
const router = require('express').Router()
const  Data  = require('../models/data')
const Sequelize = require('sequelize')

router.get('/perfoot', async function (req, res, next) {
  try {
    const datapoints = await Data.findAll({
      where: {
        energyperfoot: { [Sequelize.Op.not]: 0 }
      },
      order: [["yearbuilt", "ASC"]]
    });
    res.send(datapoints)
  } catch (error) {
    res.status(500).send(`Something went wrong: ${error}`);
  }
});


router.get('/totalghg', async function (req, res, next) {
  try {
    const datapoints = await Data.findAll({
      where: {
        totalghg: { [Sequelize.Op.not]: 0 }
      },
      order: [["yearbuilt", "ASC"]]
    });
    res.send(datapoints)
  } catch (error) {
    res.status(500).send(`Something went wrong: ${error}`);
  }
});

router.get('/', async function (req, res, next) {
  try {
    const datapoints = await Data.findAll({where: {
      energystarscore: {[Sequelize.Op.not]: 0}
    },
    order: [["yearbuilt", "ASC"]]});
    res.send(datapoints)
  } catch (error) {
    res.status(500).send(`Something went wrong: ${error}`);
  }
});


module.exports = router
