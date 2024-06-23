const db = require('../../data/dbConfig')

const getUsers = async () => {
	let answer = await db('users')
	return answer
}

const getUserById = async (id) => {
	let [user] = await db('users').where('id', id)
	return user
}

const addUser = async (user) => {
	let answer = await db('users').insert(user)
	return getUserById(answer)
}

module.exports = {
	getUserById, 
	addUser,
	getUsers
}