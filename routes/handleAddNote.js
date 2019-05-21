const {log} = require('../routeUtils');

const handleAddNote = (db) => (req, res) => {
	const {uid, text} = req.body;
	const textTrimmed = text.trim();

	db.none('INSERT INTO notes (userid, notes) VALUES ($1, $2)', [uid, textTrimmed])
	.then(() => {
		res.status(200).json("Note saved");
		log(uid, req.url, "Success");
	})
	.catch(error => { //We'll get a unique id only error
		log(uid, req.url, error);
		db.none('UPDATE notes SET notes = $1 WHERE userid = $2', [textTrimmed, uid])
		.then(()=>{
			res.status(200).json("Note saved");
			log(uid, req.url, "Success");
		})   
	});
}

module.exports = {
	handleAddNote: handleAddNote
}