// build your `/api/tasks` router here
const router = require('express').Router()
const Task = require('./model')


const notNonDescript = async (req, res, next) => {
  try {
    const description = await (req.body.  task_description);
    if (!description) {
      next({status: 400, message: "It's nondescript."})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

const idValidation = (req,res, next) => {
  Task.getById(req.body.project_id)
    .then(existing => {
      if (!existing) {
        next({ status: 400, message: 'no identity'})
        } else {
          next()
        }
    })
    .catch(next)
}

router.get('/', (req, res, next) => {
  Task.getAll().then(task => {
    res.status(200).json(task)
  })
  .catch(next)
})

router.post('/', 
  idValidation, 
  notNonDescript, 
  async (req, res, next) => {
    Task.create(req.body)
      .then(data => {
        res.status(201).json(data)
      })
      .then(next);
})

router.use((err, req, res) => {
  res.status(500).json({
    ustomMessage: 'Again I have failed',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router