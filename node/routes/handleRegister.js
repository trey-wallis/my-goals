const {log} = require('../routeUtils');

const handleRegister = (uuidv4, db, bcrypt) => (req, res) => {
	const {username, password, passwordRepeat} = req.body;

	if (username === '' || password === '' || passwordRepeat === ''){
		res.status(400).json("Please fill out all fields");
	} else if (password.length < 8){
		res.status(400).json("A password must have at least 8 characters");
	} else if (password !== passwordRepeat){
		res.status(400).json("Passwords don't match");
	} else {
		const usernameFormatted = username.toLowerCase().trim();
		const sessionKey = uuidv4();

		db.one('SELECT * FROM users WHERE name = $1', usernameFormatted)
    	.then((data) => {
    		res.status(400).json("User already exists");
    	})
    	.catch(error => {
			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(password, salt, null, (err, hash) => {

			    	db.task(t => {
			    		return t.none('INSERT INTO users(name, display, hash) VALUES ($1, $2, $3)', [usernameFormatted, username, hash])
			    			.then(() => {
			    				return t.one('SELECT id, display FROM users WHERE name = $1', usernameFormatted)
			    				.then(user => {
			    					const id = user.id;
			    					return t.none('INSERT INTO online(userid, online, sessionkey) VALUES ($1, $2, $3)', [id, true, sessionKey])
			    					.then(()=>{
			    						return {
			    							uid: id,
			    							display: user.display,
			    							sessionkey: sessionKey
			    						}
			    					});
			    				});
			    			});
			    	}).then(profile=>{
			    		res.status(200).json(profile);
			    		log(usernameFormatted, req.url, "Registered")
			    	}).catch((error) => {
			    		log(usernameFormatted, req.url, error);
			    		res.status(400).json("An error occured while logging in");
			    	});
				});
    		});
		});
	}
}

module.exports = {
	handleRegister: handleRegister
}