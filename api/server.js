// BUILD YOUR SERVER HERE
const express = require('express');
const { find, findById } = require('./users/model');

// Instance
const server = express();

// Middleware
server.use(express.json());

// Endpoints

// @desc   Fetch all users
// @route  GET /api/users
// @access Public
server.get('/api/users', (req, res) => {
	find()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => {
			console.log(err.message);
			res
				.status(500)
				.json({ message: 'The users information could not be retrieved' });
		});
});

// @desc   Fetch a user by id
// @route  GET /api/users/:id
// @access Public
server.get('/api/users/:id', (req, res) => {
	const id = req.params.id;

	findById(id)
		.then((user) => {
			if (!user) {
				res
					.status(404)
					.json({ message: 'The user with the specified ID does not exist' });
			} else {
				res.status(200).json(user);
			}
		})
		.catch((err) => {
			console.log(err.message);
			res
				.status(500)
				.json({ message: 'The user information could not be retrieved' });
		});
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
