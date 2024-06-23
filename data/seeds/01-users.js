/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').truncate()
  await knex('users').insert([
		{ username: 'John', password: 1234 },
		{ username: 'Terry', password: 1234 },
		{ username: 'Cindy', password: 1234 },
	]);
};
