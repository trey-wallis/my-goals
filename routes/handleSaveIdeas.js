const {log} = require('../routeUtils');

const handleSaveIdeas = (db) => (req, res) => {
	const {uid, body} = req.body;
	const textTrimmed = text.trim();

	db.none('INSERT INTO ideas (body, user_id) VALUES ($1, $2)', [textTrimmed, uid])
	.then(() => {
		res.status(200).json("Ideas saved");
		log(uid, req.url, "Success");
	})
	.catch(err => { //We'll get a unique id only error
		//log(uid, req.url, error);
		db.none('UPDATE  SET body = $1 WHERE user_id = $2', [textTrimmed, uid])
		.then(()=>{
			res.status(200).json("Ideas saved");
			log(uid, req.url, "Success");
		})
		.catch(err => {
			log(uid, req.url, err);
			res.status(400).json("Error saving ideas!");
		})
	});
}

module.exports = {
	handleSaveIdeas : handleSaveIdeas
}
