const {log} = require('../routeUtils');

const handleEditGoal = (db) => (req, res) => {
	const {uid, selectedId, visionCategory, visionItem, name, description, plans, start, end, progressTracking, progressTotal} = req.body;

	const nameFormatted = name.trim();
	const descriptionFormatted = description.trim();
	const plansFormatted = plans.trim();

	if (name === '' || description === '' || start === '' || end === '' || progressTotal === 0){
		return res.status(400).json("Please fill out all fields");
	}

	db.none('UPDATE goals SET name=$1, description=$2, visionid=$3, starttime=$4, endtime=$5, plans=$6, progress_tracking=$7, progresstotal=$8 WHERE userid=$9 AND id=$10',
			[nameFormatted, descriptionFormatted, visionItem, start, end, plansFormatted, progressTracking, progressTotal, uid, selectedId])
	.then(()=>{
		res.status(200).json("Success");
	 	log(uid, req.url, "Success")
    }).catch((error) => {
    	log(uid, req.url, error);
		res.status(400).json("An error occurred while editting the goal");  
	}); 

}

module.exports = {
	handleEditGoal: handleEditGoal
}