const {log} = require('../routeUtils');

const handleAddVisionCategory = (db) => (req, res) => {
	const {uid, name} = req.body;

	if (name === ''){
		return res.status(400).json("Please enter a category name");
	}

	db.task(t=>{
		return t.none('INSERT INTO categories(name, userid) VALUES ($1, $2)', [name.trim(), uid]).
			then(()=>{
				return t.one("SELECT id, name FROM categories ORDER BY id DESC LIMIT 1").
					then((category)=>{
						return category;
					});
				return;
			})
	}).then(data => {
		res.status(200).json(data);
		log(uid, req.url, "Success");
	}).catch(error => {
		log(uid, req.url, error);
		res.status(400).json("An error occurred while adding category");
	});
}

module.exports = {
	handleAddVisionCategory: handleAddVisionCategory
}