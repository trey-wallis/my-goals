const {log} = require('../routeUtils');

const handleEditVisionCategory = (db) => (req, res) => {
	const {uid, id, name} = req.body;

	db.none("UPDATE categories SET name=$1 WHERE id=$2", [name.trim(), id]).
	then(()=>{
		res.status(200).json("Successfully updated category");
		log(uid, req.url, "Successfully updated category");
	}).catch((error) => {
		log(uid, req.url, error);
	});
}

module.exports = {
	handleEditVisionCategory: handleEditVisionCategory
}