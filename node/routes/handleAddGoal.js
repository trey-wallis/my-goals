const {log} = require('../routeUtils');

const handleAddGoal = (db) => (req, res) => {
	const {uid, visionCategory, visionItem, name, description, plans, start, end, progressTracking, progressTotal} = req.body;

	const nameFormatted = name.trim();
	const descriptionFormatted = description.trim();
	const plansFormatted = plans.trim();

	if (name === '' || description === '' || start === '' || end === '' || progressTotal === 0){
		return res.status(400).json("Please fill out all fields");
	}

	db.task(t => {
			return t.none('INSERT INTO goals(name, description, visionid, userid, starttime, endtime, plans, progress_tracking, progresstotal) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
				[nameFormatted, descriptionFormatted, visionItem, uid, start, end, plansFormatted, progressTracking, progressTotal])
		    	.then((user) => {
		    		return t.one("SELECT * FROM goals WHERE userid = $1 ORDER BY id DESC LIMIT 1", uid)
		    			.then(goal => {
		    				return goal;
		    			});
		    	});
		   	}).then((data)=>{
		    	res.status(200).json(data);
		    	log(uid, req.url, "Success")
		    }).catch((error) => {
		    	log(uid, req.url, error);
				res.status(400).json("An error occurred while adding the goal");  
		    }); 

}

module.exports = {
	handleAddGoal: handleAddGoal
}