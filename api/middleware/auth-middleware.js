const db = require('../../data/dbConfig')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const secretKey = process.env.SECRET_KEY|| 'shh'
const options = { expiresIn: '1d'}

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

const loginCheck = async (req, res, next) => {
	let { username, password } = req.body
	if(!username || !password){
		res.status(400).json({ message: 'username and password required' });
	}
	let [answer] = await db('users').where('username', username)
	let correctPass = false;
	let pass;
	if (answer) {
		pass = bcrypt.compareSync(password, answer.password);
		if (pass) {
			correctPass = true;
		}
	}
	if(answer && correctPass) {
		let userInfo = { id: answer.id,username: answer.username }
		req.user = userInfo
		next()
	} else {
		res.status(400).json({ message: 'invalid credentials' });
	}
}

const tokenGenerate = (req, res, next) => {
	const payload = {
		subject: req.user.id,
		username: req.user.name
	}
	const token = jwt.sign(payload, secretKey, options)
	req.token = token;
	next()
}

module.exports = {
	userNameCheck,
	hashPass,
	loginCheck,
	tokenGenerate
}