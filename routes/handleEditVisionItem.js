const {log} = require('../routeUtils');

const handleEditVisionItem = (db) => (req, res) => {
	const {uid, visionItems} = req.body;

	let err = false;
	visionItems.forEach(visionItem => {
		const id = visionItem.id;
		const title = visionItem.title.trim();
		const description = visionItem.description.trim();
		const url = visionItem.url.trim();
		const categoryId = visionItem.categorySelectedId;

		db.none("UPDATE visionitem SET title=$1, description=$2, url=$3, categoryid=$4 WHERE id=$5", [title, description, url, categoryId, id]).
		then(()=>{
		}).catch((error) => {
			err = true;
			log(uid, req.url, error);
		});
	});
	if (err){
		res.status(400).json("Error while updating goal values");
	}
	else{
		res.status(200).json("Successfully updated goals");
		log(uid, req.url, "Success");
	}

}

module.exports = {
	handleEditVisionItem: handleEditVisionItem
}