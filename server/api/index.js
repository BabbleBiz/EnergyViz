'use strict'
const router = require('express').Router()
const  Data  = require('../models/data')


router.get('/', async function (req, res, next) {
  try {
    const datapoints = await Data.findAll();
    res.send(datapoints)
  } catch (error) {
    res.status(500).send(`Something went wrong: ${error}`);
  }
});


module.exports = router
