
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          desc: "Create the database.",
          notes: "Migrate and seed a SQLite3 Database.",
          project_id: 1
        },
        {
          desc: "Pull the weeds.",
          notes: "Remove the weeds and then fertilize the grass.",
          project_id: 2,
          completed: 'true'
        }
      ]);
    });
};
