const express = require('express');
const { requireLogin } = require('../middleware/auth');
const User = require('../models/User');
const Database = require('../models/Database');

const router = express.Router();

router.get('/', (req, res) => res.send('Test user'));

// @route   POST /api/database/create
// @desc    Creates a database instance
// access   Private

router.post('/create', requireLogin(true), async (req, res) => {
	const { name, type } = req.body;
	try {
        const user = req.user;
		const db = new Database({
			name,
			type,
		});
		await db.save();
        const dbs = [db._id, ...user.databases];
        await User.findOneAndUpdate({ _id: req.id }, { databases: dbs });
        res.status(201).json({ message: 'Database succesfully created!' });
	} catch (err) {
		if (err.name === 'ValidationError') {
			for (const field in err.errors)
				return res.status(400).json({ message: err.errors[field].properties.message });
		}
		return res.status(500).send('Server Error');
	}
});


module.exports = router;