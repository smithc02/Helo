require('dotenv').config();
const bcrypt = require('bcryptjs');

module.exports = {
	register: async (req, res) => {
		const { username, password } = req.body;
		const db = req.app.get('db');
		const hash = await bcrypt.hash(password, 12);
		try {
			const response = await db.add_user([username, hash]);
			req.session.user = { username: response[0].username };
			res.status(200).json(response[0].username);
		} catch (err) {
			console.log(err);
			res.status(401).json('An error occurred');
		}
	},

	login: async (req, res) => {
		const { username, password } = req.body;
		const db = req.app.get('db');
		db
			.get_user([username])
			.then(async response => {
				if (!response.length) {
					console.log('log 1', response);
					res.status(401).json({ error: 'No user found' });
				} else {
					console.log('log2', response);
					const isMatch = await bcrypt.compare(
						password,
						response[0].hash
					);
					if (!isMatch) {
						res.status(401).json({ error: 'Shitty H4x0r' });
					} else {
						req.session.user = { username: response[0].username };
						res
							.status(200)
							.json({ username: response[0].username });
					}
				}
			})
			.catch(err => console.log(err));
	}
};
