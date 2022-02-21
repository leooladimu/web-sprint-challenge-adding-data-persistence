// build your `Resource` model here
const db = require('../../data/dbConfig')

function getAll() {
  return db('resources')
}

function getByName(resource_name) {
  return db('resources')
    .where({resource_name})
    .first() 
}

function create(data) {
  console.log(data)
  return db('resources')
    .insert(data)
    .then(resource_id => {
      return db('resources')
        .where({resource_id})
        .first()
  })
}
 
module.exports = {
  getAll,
  create,
  getByName
}