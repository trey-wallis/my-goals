const {log} = require('../routeUtils');

const handleCheckLogin = (db) => (req, res) => {
	const {uid} = req.body;


	db.task(t => {
		return t.one('SELECT display FROM users WHERE id=$1', uid)
		   .then((user) => {
		    	return {
		    		display: user.display,
		    	};
		    });
		}).then((profile)=>{
		    res.status(200).json(profile);
		    log(uid, req.url, "Logged in")
		}).catch((error) => {
		  	//log(uid, req.url, error);
		    res.status(400).json("Unable to relogin");
		});
}

module.exports = {
	handleCheckLogin: handleCheckLogin
}