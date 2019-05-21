const {log} = require('../routeUtils');

const handleCompleteTask = (db) => (req, res) => {
	const {uid, taskId} = req.body;

	db.one("SELECT completed FROM tasks WHERE id=$1", [taskId])
	.then(data => {
		let value = true;
		if (data.completed){
			value = false;
		}
		db.none("UPDATE tasks SET completed = $1 WHERE id = $2", [value, taskId])
		.then(()=>{
			res.status(200).json({completed: value})
		})
		.catch(err => {
			log(uid, req.url, err);
		});
	})
	.catch(err => {
		res.status(400).json("An error occured while handling vision item");
		log(uid, req.url, err);
	});
}

module.exports = {
	handleCompleteTask: handleCompleteTask
}