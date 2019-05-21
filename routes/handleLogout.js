const {log} = require('../routeUtils');

const handleLogout = (db) => (req, res) => {
	const {uid} = req.body;

	db.none("UPDATE online SET online=$1 WHERE userid=$2", [false, uid]).
	then(()=>{
		res.status(200).json("Successfully logged out");
		log(uid, req.url, "Success");
	}).catch((error) => {
		log(uid, req.url, error);
	});
}

module.exports = {
	handleLogout: handleLogout
}