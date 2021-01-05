const {log} = require('../routeUtils');

const handleTasks = (db) => (req, res) => {
	const {uid, goalId} = req.body;

	db.any('SELECT * FROM tasks WHERE user_id = $1', uid).
	then(tasks => {
		res.json(tasks);
		log(uid, req.url, "Success");
	})
	.catch(error => {
		log(uid, req.url, error);
	});
}

module.exports = {
	handleTasks: handleTasks
}