'use strict'

const db = require('../server/db')
const { Data } = require('../server/models')
const csv = require('csv-parser')
const fs = require('fs')

const pullFromCSV = (csvData) => {

  let results = []

  //What of this function is reading from disk and what is actually just changing data. Move the part that changes the data into a utli function somewhere else
  fs.createReadStream(csvData)
    .pipe(csv(
      {
      mapHeaders: ({ header, index}) => header.toLowerCase()
    }
    ))
    .on('data', (data) => results.push(data))
    .on('end', () => { console.log("Hi") })
    return results
  }

const data = pullFromCSV('Energy2014.csv')

async function seed() {
  console.log(data)
  await db.sync({ force: true })
  console.log('db synced!')

  const finalData = await Promise.all([
    Data.bulkCreate(data)
  ])
  console.log(`seeded successfully`)
}



// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
