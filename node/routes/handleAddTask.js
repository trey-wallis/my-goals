const {log} = require('../routeUtils');

const handleAddTask = (db) => (req, res) => {
	const {uid, goal_id, name} = req.body;

	const nameFormatted = name.trim();

	db.task(t=>{
		return t.none('INSERT INTO tasks (name, goal_id, user_id) VALUES ($1, $2, $3)', [nameFormatted, goal_id, uid]).
			then(()=>{
				return t.one("SELECT * FROM tasks WHERE user_id = $1 ORDER BY id DESC LIMIT 1", uid)
					.then(item => {
						return item;
					});
			})
	}).then(data => {
		res.status(200).json(data);
		log(uid, req.url, "Success");
	}).catch(error => {
		log(uid, req.url, error);
		res.status(400).json("An error occurred while adding the task");  
	});
}

module.exports = {
	handleAddTask: handleAddTask
}