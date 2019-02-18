const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
const pgp = require('pg-promise')({});


const PORT = 3006;
const app = express();


const cn = 'postgres://root:root@localhost:5432/mygoalsreact';
const db = pgp(cn);

/*
* Middlewares for express
*/
app.use(cors()); //Allow cross origin resource sharing
app.use(bodyParser.json());
app.use((req, res, next) => {
	console.log("New request from client:", req.body);
	next();
});

grabResources = (res, userId) => {
	db.task(t => {
	    return t.any('SELECT * FROM categories WHERE userId = $1', userId)
	        .then(categories => {
	        	return t.any('SELECT * FROM visionitem WHERE userId= $1', userId).
	        		then(items => {
	        			console.log(items);
	        			return { categories, items};
	        		})
	        	return {categories};
	        });    
	})
	    .then(data => {
	    	res.json(data);
	    })
	    .catch(error => {
	       console.log(error);   
	    });
}

/*
* Post Requests
*/
app.post('/register', (req, res) => {
	const {username, password, passwordRepeat} = req.body;
	const usernameLowercase = username.toLowerCase();

	if (username === '' || password === '' || passwordRepeat === ''){
		res.status(400).json("Please fill out all fields");
	} else if (password.length < 8){
		res.status(400).json("Your password must have at least 8 characters");
	} else if (password !== passwordRepeat){
		res.status(400).json("Passwords don't match");
	} else {
		db.one('SELECT * FROM users WHERE name = $1', usernameLowercase)
    	.then((data) => {
    		res.status(400).json("User already exists");
    	})
    	.catch(error => {
			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(password, salt, null, (err, hash) => {
					db.none('INSERT INTO users(name, hash) VALUES ($1, $2)', [usernameLowercase, hash])
					.then(()=>{
						res.status(200).json("Registered");
						console.log("Registered", username);
					})
					.catch((error)=>{
						console.log(error);
						res.status(400).json("An error occurred while registering");
					});
				});
			});
    	});
	}
});

app.post('/signin', (req, res) => {
	const {username, password} = req.body;
	const usernameLowercase = username.toLowerCase();

	db.one('SELECT * FROM users WHERE name= $1', usernameLowercase)
    .then((data) => {
	    bcrypt.compare(password, data.hash, (err, match) => {
		    if(match){
		    	grabResources(res, data.id);
		    	console.log(username, "has successfully logged in");
		    } else {
		    	res.status(400).json("Invalid username or password");
		    }
		});
    })
    .catch(error => {
    	res.status(400).json("Invalid username or password");
        console.log(error);
    });
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
