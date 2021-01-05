const {log} = require('../routeUtils');

const handleDeleteGoal = (db) => (req, res) => {
	const {uid, id} = req.body;

	db.task(t => {
		return t.none("DELETE FROM habits WHERE goal_id=$1 AND user_id=$2", [id, uid]).
		then(() => {
			return t.none("DELETE FROM goals WHERE id=$1 AND userid=$2", [id, uid]).
			then(()=>{

			});
		})
	}).
	then(()=>{
		res.status(200).json("Success");
		log(uid, req.url, "Success");
	}).catch((error) => {
		log(uid, req.url, error);
	});
}

module.exports = {
	handleDeleteGoal: handleDeleteGoal
}