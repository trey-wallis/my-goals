const {log} = require('../routeUtils');

const handleDeleteTask = (db) => (req, res) => {
	const {uid, taskId} = req.body;

	db.none("DELETE FROM tasks WHERE id=$1 AND user_id=$2", [taskId, uid]).
	then(()=>{
		res.status(200).json("Success");
		log(uid, req.url, "Success");
	}).catch((error) => {
		log(uid, req.url, error);
	});
}

module.exports = {
	handleDeleteTask: handleDeleteTask
}