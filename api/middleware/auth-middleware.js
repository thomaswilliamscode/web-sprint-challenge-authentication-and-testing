const db = require('../../data/dbConfig')
const bcrypt = require('bcryptjs')


const secretKey = process.env.SECRET_KEY|| 'shh'

const userNameCheck = async (req, res, next) => {
	const { username, password } = req.body
	if(username && password) {
		if(typeof password === 'string') {
			const answer = await db('users').where('username', username).first();
			if (answer === undefined) {
				req.user = { username: username, password: password };
				next();
			} else {
				res.status(400).json({ message: 'username taken' });
			}
		} else {
			res.status(400).json({message: 'please make password a string'})
		}
	} else {
		res.status(400).json({ message: 'username and password required' });
	}
	
}

const hashPass = async (req, res, next) => {
	let user = req.user
	console.log(user)
	const hash = bcrypt.hashSync(user.password, 5);
	user.password = hash
	next()
}

const loginCheck = (req, res, next) => {
	
}

const tokenGenerate = () => {

}

module.exports = {
	userNameCheck,
	hashPass
}