/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('jokes').truncate()
  await knex('jokes').insert([
		{
			jokeQuestion: `Why do programmers prefer dark mode?`, 
      jokeAnswer:  `Because light attracts bugs!`,
		},
		{
			jokeQuestion: `Why do Java developers wear glasses?`,
			jokeAnswer: `Because they don't see sharp.`,
		},
		{
			jokeQuestion: `How many programmers does it take to change a light bulb?`,
			jokeAnswer: `None. It's a hardware problem.`,
		},
	]);
};
