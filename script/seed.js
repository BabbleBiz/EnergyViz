'use strict'

const db = require('../server/db')
const { Data } = require('../server/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  const data = await Promise.all([
    Data.create({ dataYear: 2017, propertyName: 'My House', zipcode: 60640, communityArea: 'Uptown', energyUse: 8534, totalGHGEmissions: 10007 }),
    Data.create({ dataYear: 2016, propertyName: 'Your House', zipcode: 60600, communityArea: 'Uptown', energyUse: 7569, totalGHGEmissions: 20307 }),
    Data.create({ dataYear: 2017, propertyName: 'Her House', zipcode: 60440, communityArea: 'Logan Square', energyUse: 6234, totalGHGEmissions: 30056 }),
    Data.create({ dataYear: 2017, propertyName: 'My Parents House', zipcode: 64564, communityArea: 'Uptown', energyUse: 3454, totalGHGEmissions: 9304 }),
    Data.create({ dataYear: 2018, propertyName: 'Your Parents House', zipcode: 62343, communityArea: 'Loop', energyUse: 2345, totalGHGEmissions: 13454 }),
    Data.create({ dataYear: 2017, propertyName: 'Her Parents House', zipcode: 62533, communityArea: 'Lakeview', energyUse: 9345, totalGHGEmissions: 56785 })
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
