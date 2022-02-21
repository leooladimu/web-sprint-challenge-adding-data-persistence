// build your `Project` model here
const db = require('../../data/dbConfig')

function getAll() {
  return db('projects')
    .then(projects => {
      return projects.map(prj => {
        return {
          ...prj,
          project_completed: prj.project_completed ? true : false
        }
      })
    })
}

function create(data) {
  return db('projects')
    .insert(data)
    .then(project_id => {
      return db('projects')
        .where({project_id})
        .first()
        .then(contents => {
          return { ...contents,
            project_completed: contents.project_completed ? true : false
          }
        }
      )
    })
}

module.exports = {
  getAll,
  create
}