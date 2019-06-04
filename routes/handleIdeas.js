const {log} = require('../routeUtils');

const handleIdeas = (db) => (req, res) => {
	const {uid} = req.body;

	db.one('SELECT body FROM ideas WHERE user_id = $1', [uid])
	.then(data => {
		res.json(data.notes);
		log(uid, req.url, "Success");
	})
	.catch(error => {
		log(uid, req.url, error);
	});
}

module.exports = {
	handleIdeas: handleIdeas
}
