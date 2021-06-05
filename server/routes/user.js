const express = require('express');
const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { requireLogin } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

router.get('/', (req, res) => res.send('Test user'));

// @route   POST /api/users/register
// @desc    Register a new user
// access   Public

router.post('/register', async (req, res) => {
	const { name, email, password, confirmPassword } = req.body;
	try {
		if(password !== confirmPassword) return res.status(400).json({
			message: `Passwords don't match`
		});
		let user = await User.findOne({ email });
		if (user) return res.status(400).json({
			message: 'An account has already been registered with this email. Do you want to login instead?'
		});

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		user = new User({
			...req.body,
			name,
			email,
			password: hash,
		});

		await user.save();

		const payload = {
			id: user.id + user.id,
			iat: new Date().getTime()
		};

		jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
			if (err) throw err;
			res.status(200).json({ token });
		});
	} catch (err) {
		if (err.name === 'ValidationError') {
			for (const field in err.errors)
				return res.status(400).json({ message: err.errors[field].properties.message });
		}
		return res.status(500).send('Server Error');
	}
});

// @route   /api/users/login
// @desc    Login a user
// access   Public

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user)
			return res.status(400).json({
				message: 'Incorrect username or password.'
			});
		const isPasswordRight = await bcrypt.compare(password, user.password);
		if(!isPasswordRight) return res.status(400).json({
			message: "Incorrect username or password."
		})

		const payload = {
			id: user.id + user.id,
			iat: new Date().getTime()
		};


		jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
			if (err) throw err;
			res.status(200).json({
				token,
				id: user._id,
				username: user.username,
				name: user.name,				
				email,
			});
		});
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server Error');
	}
});


//@route   /api/user/authenticateUser
//@desc    Validate a user token
//access   Private

router.post('/authenticateUser', requireLogin(true), async (req, res) => {
	try {
		return res.status(200).json({
			token: req.header('x-auth-token'),
			username: req.user.username,
			name: req.user.name,
			email: req.user.email,
			id: req.id
		});
	} catch(err) {
		return res.status(500).json({
			message: 'Internal server error'
		});
	}
});

module.exports = router;