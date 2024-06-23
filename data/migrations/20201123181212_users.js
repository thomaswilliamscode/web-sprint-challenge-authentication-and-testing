exports.up = function (knex) {
  return knex.schema
    .createTable('users', users => {
      users.increments();
      users.string('username', 255).notNullable().unique();
      users.string('password', 255).notNullable();
  })
    .createTable('jokes', jokes => {
      jokes.increments();
      jokes.string('jokeQuestion').notNullable().unique();
      jokes.string('jokeAnswer').notNullable()
  })
  
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('jokes')
    .dropTableIfExists('users');
};
