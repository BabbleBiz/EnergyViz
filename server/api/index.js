'use strict'
const router = require('express').Router()
const  Data  = require('../models/data')
const csv = require('csv-parser')
const fs = require('fs')

const halp = () => {

  let results = []

  fs.createReadStream('../../../TestData.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {console.log(results)})
}

halp()

router.get('/', async function (req, res, next) {
  try {
    const datapoints = await Data.findAll();
    res.send(datapoints)
  } catch (error) {
    res.status(500).send(`Something went wrong: ${error}`);
  }
});


module.exports = router
