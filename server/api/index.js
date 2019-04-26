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

// router.post('/', (req, res, next) => {
//   Student.create(req.body).then(data => res.json(data)).catch(next)
// })

// router.delete('/:studentId', async (req, res, next) => {
//   try {
//     console.log("In Delete route for Student")
//     await Student.destroy({
//       where: { id: req.params.studentId }
//     })
//     res.send("Student Deleted Sucessfully")
//   } catch (err) {
//     res.status(500).send(`Something went wrong: ${err}`)
//   }
// })
// router.use((req, res, next) => {
//   const err = new Error('API route not found!')
//   err.status = 404
//   next(err)
// })

module.exports = router
