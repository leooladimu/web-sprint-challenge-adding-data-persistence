// build your `Task` model here
const db = require('../../data/dbConfig')

function getAll() {
  return db('tasks as t')
    .select('p.*', 't.*')
    .leftJoin(
      'projects as p',
      'p.project_id', 
      't.project_id'
    )
    .then(data => {
      return data.map(things => {
        return {
          ...things,
          task_completed: things.task_completed ? true : false
        }
      })
    })
}

function create(task) {
  return db('tasks')
    .insert(task)
    .then(task_id => {
      return db('tasks')
        .where({ task_id })
        .first()
        .then(thing => {
          return {
            ...thing,
            task_completed: thing.task_completed ? true === 0
            : false
          }
        })
    })
}

function getById(project_id) {
  return db('projects')
    .where({ project_id })
    .first()
}

module.exports = {
  getAll,
  create,
  getById,
}