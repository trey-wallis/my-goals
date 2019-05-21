const {log} = require('../routeUtils');

const handleVisionBoard = (db) => (req, res) => {
	const {uid} = req.body;
	db.task(t => {
	    return t.any('SELECT id, name FROM categories WHERE userid = $1', uid)
	        .then(categories => {
	        	return t.any('SELECT id, title, description, url, categoryid, complete FROM visionitem WHERE userid= $1', uid)
	        		.then(items => {
	        			return { categories, items};
	        		})
	        });    
	})
	.then(data => {
		res.json(data);
		log(uid, req.url, "Success");
	})
	.catch(error => {
		log(uid, req.url, error);
	});
}

module.exports = {
	handleVisionBoard: handleVisionBoard
}