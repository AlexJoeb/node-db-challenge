
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projectresources').del()
    .then(function () {
      // Inserts seed entries
      return knex('projectresources').insert([
        {
          project_id: 1,
          resource_id: 2,
        },
        {
          project_id: 2,
          resource_id: 1,
        }
      ]);
    });
};
