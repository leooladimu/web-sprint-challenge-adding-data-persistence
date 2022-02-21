/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', (t) => {
      t.increments('project_id')
      t.string('project_name')
        .notNullable().unique()
      t.string('project_description')
      t.boolean('project_completed')
        .defaultTo(false)
    })
    .createTable('resources', (t) => {
      t.increments('resource_id')
      t.string('resource_name')
        .notNullable().unique()
      t.string('resource_description')
    })
    .createTable('tasks', (t) => {
      t.increments('task_id')
      t.string('task_description')
        .notNullable()
      t.string('task_notes')
      t.boolean('task_completed')
        .defaultTo(false)
      t.integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('RESTRICT')
    })
    .createTable('project_resources', (t) => {
      t.increments('project_resource_id')
      t.integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('RESTRICT')
      t.integer('resource_id')
        .unsigned()
        .notNullable()
        .references('resource_id')
        .inTable('resources')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
    })
}


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('projects')
    .dropTableIfExists('resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('project_resources')
}

