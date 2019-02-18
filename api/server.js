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

app.get('/visionboard/:id', (req, res) => {
	const {id} = req.params;
	db.task(t => {
	    return t.any('SELECT id, name FROM categories WHERE userid = $1', id).
	        then(categories => {
	        	return t.any('SELECT title, description, url, categoryid FROM visionitem WHERE userid= $1', id).
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
});

/*
* Post Requests
*/
app.post('/addcategory', (req, res) => {
	const {userId, name} = req.body;

	if (name === ''){
		return res.status(400).json("Please enter a category name");
	}

	db.none('INSERT INTO categories(name, userid) VALUES ($1, $2)', [name, userId]).
	then(()=>{
		db.one("SELECT id, name FROM categories ORDER BY id DESC LIMIT 1").
		then((data)=>{
			res.status(200).json(data);
			console.log(data);
		}).catch((error) => {
			console.log(error);
		});
	}).catch((error) => {
		console.log(error);
		res.status(400).json("An error occurred while adding category");
	});
});

app.post('/addvisionitem', (req, res) => {
	const {name, description, url, userId, categoryId } = req.body;

	if (name === ''){
		return res.status(400).json("Please enter a name");
	} else if(description === ''){
		return res.status(400).json("Please enter a description");
	} else if(url === ''){
		return res.status(400).json("Please enter a url");
	}

	db.none('INSERT INTO visionitem(title, description, url, userid, categoryid) VALUES ($1, $2, $3, $4, $5)', [name, description, url, userId, categoryId]).
	then(()=>{
		db.one("SELECT title, description, url, categoryid FROM visionitem ORDER BY id DESC LIMIT 1").
		then((data)=>{
			res.status(200).json(data);
			console.log(data);
		}).catch((error) => {
			console.log(error);
		});
	}).catch((error) => {
		console.log(error);
		res.status(400).json("An error occurred while adding category");
	});
});

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
		    	db.one('SELECT id, display FROM users WHERE name= $1', usernameLowercase).
		    	then((data) => {
		    		res.status(200).json(data);
		    		console.log(username, "has successfully logged in");
		    	}).catch((error) =>{
		    		console.log(error);
		    		res.status(400).json("An error occured while logging in");
		    	});
		    } else {
		    	res.status(400).json("Invalid username or password");
		    }
		});
    })
    .catch(error => {
    	res.status(400).json("Account doesn't exist. Please register");
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
