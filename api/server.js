// BUILD YOUR SERVER HERE
const express = require('express');
const { find, findById, insert } = require('./users/model');

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

// @desc   Create new user
// @route  POST /api/users
// @access Public
server.post('/api/users', (req, res) => {
	const newUser = req.body;

	if (!newUser.name || !newUser.bio) {
		res
			.status(400)
			.json({ message: 'Please provide name and bio for the user' });
	} else {
		insert(newUser)
			.then((user) => {
				res.status(201).json(user);
			})
			.catch((err) => {
				console.log(err.message);
				res
					.status(500)
					.json({
						message: 'There was an error while saving the user to the database',
					});
			});
	}
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
