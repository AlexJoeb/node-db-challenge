
exports.up = function (knex) {
    return knex.schema.
        createTable('projects', tbl => {
            tbl.increments();
            tbl.text('name', 128).notNullable();
            tbl.text('desc', 128);
            tbl.text('completed').defaultTo('false');
        })
        .createTable('tasks', tbl => {
            tbl.increments();
            tbl.text('desc', 128).notNullable();
            tbl.text('notes', 128);
            tbl.text('completed').defaultTo('false');
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');

        })
        .createTable('resources', tbl => {
            tbl.increments();
            tbl.text('name', 128).notNullable();
            tbl.text('desc', 128);
        })
        .createTable('projectresources', tbl => {
            tbl.increments();
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.integer('resource_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('resources')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
};

exports.down = function (knex) {
    return knex.scheme
        .dropTableIfExists('projectresources')
        .dropTableIfExists('resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('projects');
};
