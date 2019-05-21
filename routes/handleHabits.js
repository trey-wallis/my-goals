const {log} = require('../routeUtils');

const handleHabits = (db) => (req, res) => {
	const {uid} = req.body;

	db.any('SELECT * FROM habits WHERE user_id = $1', uid).
	then(habits => {
		res.json(habits);
		log(uid, req.url, "Success");
	})
	.catch(error => {
		log(uid, req.url, error);
	});
}

module.exports = {
	handleHabits: handleHabits
}