const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

const requireLogin = (required) => async (req, res, next) => {
	try {
		const decoded = jwt.verify(req.header('x-auth-token'), config.get('jwtSecret'));
		userId = decoded.id.slice(0, decoded.id.length / 2);

		const user = await User.findById(userId);
		if((required && user) || !required) {
			if(user)
				req.id = userId;
			req.user = user;
			next();
		} else {
			return res.status(401).json({ message: 'Unauthorized request'});
		}

	} catch (err) {
		if(required)
			return res.status(401).json({ message: 'Token is not valid' });
		next();
	}
};

const validateToken = async (token) => {
	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		userId = decoded.id.slice(0, decoded.id.length / 2);
		const user = await User.findById(userId);
		return user;
	} catch(err) {
		return null;
	}
}

module.exports = { requireLogin, validateToken };