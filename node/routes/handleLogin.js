const {log} = require('../routeUtils');

const handleLogin = (uuidv4, db, bcrypt) => (req, res) => {
	const {username, password} = req.body;
	const usernameFormatted = username.toLowerCase().trim();

	if (username === '' || password === ''){
		return res.status(400).json("Please fill out all fields");
	}

	db.one('SELECT * FROM users WHERE name= $1', usernameFormatted)
    .then((data) => {
	    bcrypt.compare(password, data.hash, (err, match) => {
		    if(match){

		    	const sessionKey = uuidv4();

		    	db.task(t => {
		    		return t.one('SELECT id, display FROM users WHERE name= $1', usernameFormatted)
		    			.then((user) => {
		    				return t.none('UPDATE online SET online=$1, sessionkey=$2 WHERE userid=$3', [true, sessionKey, user.id])
		    					.then(()=>{
		    						return {
		    							uid: user.id,
		    							display: user.display,
		    							sessionkey: sessionKey
		    						};
		    					});
		    			});
		    	}).then((profile)=>{
		    		res.status(200).json(profile);
		    		log(usernameFormatted, req.url, "Logged in")
		    	}).catch((error) => {
		    		log(usernameFormatted, req.url, error);
		    		res.status(400).json("An error occured while logging in");
		    	});
		    } else {
		    	res.status(400).json("Invalid username or password");
		    }
		});
    })
    .catch(error => {
        res.status(400).json("Account doesn't exist. Please register then try again");
    });
}

module.exports = {
	handleLogin: handleLogin
}