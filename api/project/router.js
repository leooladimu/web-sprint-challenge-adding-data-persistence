// build your `/api/projects` router here
const router = require('express').Router()
const Project = require('./model')

const notNoName = async (req, res, next) => {
  try {
    const name = await(req.body.project_name)   
      if (!name) {
        next({ status: 400, message: 'project has no name' })
      } else {
        next()
      }
  } catch (err) {
    next(err)
  }
}

router.get('/', (req, res, next) => {
  Project.getAll()
    .then(prj => {
      res.status(200).json(prj)
    })
    .catch(next)
})

router.post('/', notNoName, (req, res, next) => {
  Project.create(req.body)
    .then(data => {
      res.status(201).json(data)
    })
    .then(next)
})

router.use((err, req, res) => {
  res.status(500).json({
    customMessage: 'I built something wrong',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router