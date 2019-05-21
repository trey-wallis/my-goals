const {log} = require('../routeUtils');

const handleDeleteVisionCategory = (db) => (req, res) => {
	const {uid, deleteId} = req.body;

	db.none("DELETE FROM categories WHERE id=$1", [deleteId]).
	then(()=>{
		res.status(200).json("Successfully deleted category");
		log(uid, req.url, "Successfully deleted category");
	}).catch((error) => {
		res.status(400).json("Error deleting category");
		log(uid, req.url, error);
	});
}

module.exports = {
	handleDeleteVisionCategory: handleDeleteVisionCategory
}