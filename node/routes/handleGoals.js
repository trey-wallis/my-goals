const {log} = require('../routeUtils');

const handleGoals = (db) => (req, res) => {
	const {uid} = req.body;

	db.task(t => {
	    return t.any('SELECT * FROM goals WHERE userid = $1', uid).
	        then(goals => {
	        	return goals;
	        });    
	})
	.then(goals => {
		res.json(goals);
		log(uid, req.url, "Success");
	})
	.catch(error => {
		log(uid, req.url, error);
	});
}

module.exports = {
	handleGoals: handleGoals
}