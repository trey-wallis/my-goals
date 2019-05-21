const {log} = require('../routeUtils');

const handleCompleteVisionItem = (db) => (req, res) => {
	const {uid, visionItemId} = req.body;

	db.one("SELECT complete FROM visionitem WHERE id=$1", [visionItemId])
	.then(data => {
		let value = true;
		if (data.complete){
			value = false;
		}
		db.none("UPDATE visionitem SET complete = $1 WHERE id = $2", [value, visionItemId])
		.then(()=>{
			res.status(200).json({complete: value})
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
	handleCompleteVisionItem: handleCompleteVisionItem
}