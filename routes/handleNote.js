const {log} = require('../routeUtils');

const handleNote = (db) => (req, res) => {
	const {uid} = req.body;

	db.one('SELECT notes FROM notes WHERE userid = $1', [uid])
	.then(data => {
		res.json(data.notes);
		log(uid, req.url, "Success"); 
	})
	.catch(error => {
		log(uid, req.url, error); 
	});
}

module.exports = {
	handleNote: handleNote
}