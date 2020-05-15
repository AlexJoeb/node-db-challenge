
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {
          name: "Gloves",
          desc: "They go on your hands."
        },
        {
          name: "Computer",
          desc: "01000011 01101111 01101101 01110000 01110101 01110100 01100101 01110010"
        },
        {
          name: "Friends",
          desc: "You might have to pay them with pizza."
        }
      ]);
    });
};
