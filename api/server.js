const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");

const PORT = 3006;
const app = express();

/*
* Our "fake" database
*/
const database = {
	users:[
		{
			id: '0',
			username: 'bob',
			hash: '$2a$10$vLD8J0SsmvqMbL8eCZ.XiOey1fhlDsxt7zjlbdA2qDUlooCRpOJLO',
			joined: new Date()
		}
	]
};

/*
* Bcrypt methods
*/
const registerUser = (response, username, password) => {
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(password, salt, null, (err, res) => {
			database.users.push({
				username: username,
				hash: res,
				joined: new Date()
			});
			console.log("Registered", username);
			console.log("Hash", res);
			response.status(200).json("Successfully registered");
		});
	});
};

const checkLogin = (res, username, password, hash) => {
	bcrypt.compare(password, hash, (err, match) => {
	    if(match){
	    	const user = database.users.find(user=> user.username === username);
	    	res.status(200).json({id: user.id, joined: user.joined});
	    	console.log(username, "has successfully logged in")
	    } else {
	    	res.status(400).json("Invalid username or password");
	    }
	});
}

/*
* Middlewares for express
*/
app.use(cors()); //Allow cross origin resource sharing
app.use(bodyParser.json());
app.use((req, res, next) => {
	console.log("New request from client:", req.body);
	next();
});

/*
* Get requests
*/
app.get('/', (req, res) => {
	res.send(database.users);
});


/*
* Post Requests
*/
app.post('/register', (req, res) => {
	const {username, password, passwordRepeat} = req.body;
	const usernameToLowercase = username.toLowerCase();
	if (username === '' || password === '' || passwordRepeat === ''){
		res.status(400).json("Please fill out all fields");
	} else if (password.length < 8){
		res.status(400).json("Your password must have at least 8 characters")
	} else if (password !== passwordRepeat){
		res.status(400).json("Passwords don't match");
	} else if (database.users.find(user => user.username === username.toLowerCase())){
		console.log("User already exists");
		res.status(400).json("Username already exists");
	} else {
		registerUser(res, usernameToLowercase, password);
	}
});

app.post('/signin', (req, res) => {
	const {username, password} = req.body;
	const usernameLowercase = username.toLowerCase();
	const user = database.users.find(user => user.username == usernameLowercase);
	if (user){
		const hash = user.hash;
		checkLogin(res, usernameLowercase, password, hash);
	} else {
		res.status(400).json("Invalid username or password");
	}
});

app.post('/logout', (req, res) => {
	console.log("Logging out");
});

/*
* Start app
*/
app.listen(PORT, ()=>{
	console.log("API is running on port", PORT);
});
