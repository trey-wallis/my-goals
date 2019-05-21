const {log} = require('../routeUtils');

const handleUpdateHabit = (db) => (req, res) => {
	const {uid, goalId, date} = req.body;

	db.any('SELECT * FROM habits WHERE user_id = $1 AND goal_id = $2 AND date = $3', [uid, goalId, date]).
	then(goals => {
	    if (goals.length === 1){
	      	db.none('DELETE FROM habits WHERE user_id = $1 AND goal_id = $2 AND date = $3', [uid, goalId, date]).
	      	then(()=>{
	     		res.status(200).json("Success");
	        }).
	       	catch(error => {
	      		console.log(error);
	        	res.status(400).json("An error occurred while deleting the habit");
	        });
	    } else {
	    	db.none('INSERT INTO habits(user_id, goal_id, date) VALUES ($1, $2, $3)', [uid, goalId, date]).
	       	then(()=>{
	       		db.one('SELECT * FROM habits ORDER BY id DESC LIMIT 1').
	       		then((data)=>{
	       			res.json(data);
	       		})
	       		.catch(error => {
	       			console.log(error);
	       			res.status(400).json("Error");
	       		})
	   		}).
    		catch(error => {
      			console.log(error);
       			res.status(400).json("An error occurred while adding the habit");
            });
	    }
	});    
}

module.exports = {
	handleUpdateHabit: handleUpdateHabit
}