
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {
          name: "Lambda Sprint - Adding Data Persistence",
          desc: "Create a database of projects."
        },
        {
          name: "Working on the yard.",
          completed: 'true',
        }
      ]);
    });
};
