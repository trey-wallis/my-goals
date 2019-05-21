const {log} = require('../routeUtils');

const handleDeleteVisionItem = (db) => (req, res) => {
	const {uid, id} = req.body;

	db.none("DELETE FROM visionitem WHERE id=$1 AND userid=$2", [id, uid]).
	then(()=>{
		res.status(200).json("Success");
		log(uid, req.url, "Success");
	}).catch((error) => {
		log(uid, req.url, error);
	});
}

module.exports = {
	handleDeleteVisionItem: handleDeleteVisionItem
}