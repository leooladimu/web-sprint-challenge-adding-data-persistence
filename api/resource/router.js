// build your `/api/resources` router here
const router = require('express').Router()
const Resource = require('./model')

const validateName = (req, res, next) => {
  Resource.getByName(req.body.resource_name)
    .then(data => {
      if (data) {
        next({ status: 400, message: 'resource_name already exists' });
      } else {
        next()
      }
    })
    .catch(next)
}

router.get('/', (req, res, next) => {
  Resource.getAll().then(resources => {
    res.status(200).json(resources)
  })
  .catch(next)
})

router.post('/', 
  validateName, 
  (req, res, next) => { 
    Resource.create(req.body)
      .then(newRes => {
        res.status(201).json(newRes)
      })
      .then(next)
})

router.use((err, req, res) => {
  res.status(500).json({
    customMessage: 'My bad',
      message: err.message,
      stack: err.stack
  })
})

module.exports = router