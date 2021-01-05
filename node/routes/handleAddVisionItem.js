const {log} = require('../routeUtils');

const handleAddVisionItem = (db) => (req, res) => {
	const {name, description, url, uid, categoryId } = req.body;

	if (name === ''){
		return res.status(400).json("Please enter a name");
	} else if(description === ''){
		return res.status(400).json("Please enter a description");
	} else if(url === ''){
		return res.status(400).json("Please enter a url");
	}

	const nameFormatted = name.trim();
	const descriptionFormatted = description.trim();
	const urlFormatted = url.trim();

	db.task(t=>{
		return t.none('INSERT INTO visionitem(title, description, url, userid, categoryid) VALUES ($1, $2, $3, $4, $5)', [nameFormatted, descriptionFormatted, urlFormatted, uid, categoryId]).
			then(()=>{
				return t.one("SELECT * FROM visionitem WHERE userid = $1 ORDER BY id DESC LIMIT 1", uid)
					.then(item => {
						return item;
					});
			})
	}).then(data => {
		res.status(200).json(data);
		log(uid, req.url, "Success");
	}).catch(error => {
		log(uid, req.url, error);
		res.status(400).json("An error occurred while adding the vision item");  
	});
}

module.exports = {
	handleAddVisionItem: handleAddVisionItem
}