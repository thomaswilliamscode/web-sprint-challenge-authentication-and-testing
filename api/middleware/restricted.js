const secretKey = process.env.SECRET_KEY || 'shh';
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const token = req.headers.authorization;
  console.log('token saved is: ', token)

	if (token) {
		jwt.verify(token, secretKey, (err, decoded) => {
      if(err) {
        res.status(401).json({message: 'token invalid'})
      } else {
        req.decodedJwt = decoded;
        next()
      }
    });
	} else {
    res.status(401).json({ message: 'token required' });
	}
	/*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};
