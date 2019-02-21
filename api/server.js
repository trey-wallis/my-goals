const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
const pgp = require('pg-promise')({});


const PORT = 3006;
const app = express();


const cn = 'postgres://root:root@localhost:5432/mygoalsreact';
const db = pgp(cn);

//A look up table for users and their username
let users = {392: "hello"}

const routes = {
	signIn: "/signin",
	register: "/register",
	addVisionCategory: "/addvisioncategory",
	addVisionItem: "/addvisionitem",
	logOut: "/logout",
	visionBoard: "/visionboard/:uid",
	checkLogin: "/checkLogin",
	settingsProfile: "/settingsProfile",
}

/*
* Middlewares for express
*/
app.use(cors()); //Allow cross origin resource sharing
app.use(bodyParser.json());
app.use((req, res, next) => {
	//var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	console.log(`\nNew request from ${req.headers.host}`, req.body);
	next();
});

/*
* Sign in, Register
*/
app.post(routes.signIn, (req, res) => {
	const {username, password} = req.body;
	const usernameLowercase = username.toLowerCase().trim();

	db.one('SELECT * FROM users WHERE name= $1', usernameLowercase)
    .then((data) => {
	    bcrypt.compare(password, data.hash, (err, match) => {
		    if(match){
		    	db.task(t => {
		    		return db.one('SELECT uid, display FROM users WHERE name= $1', usernameLowercase).
		    			then((user) => {
		    				db.none('UPDATE users SET online=$1 WHERE uid = $2', [true, user.uid]).
		    					then(()=>{
		    						return user;
		    					});
		    				return user;
		    			});
		    	}).then((data)=>{
		    		const uid = data.uid;
		    		users.uid = usernameLowercase;
		    		res.status(200).json(data);
		    		console.log(`${routes.signIn} ${usernameLowercase}`, "has successfully logged in");
		    	}).catch((error) => {
		    		console.log(`${routes.signIn} ${usernameLowercase}`, error);
		    		res.status(400).json("An error occured while logging in");
		    	});
		    } else {
		    	res.status(400).json("Invalid username or password");
		    }
		});
    })
    .catch(error => {
        //console.log(error);
        res.status(400).json("Account doesn't exist. Please register then try again");
    });
});

app.post(routes.register, (req, res) => {
	const {username, password, passwordRepeat} = req.body;
	const usernameLowercase = username.toLowerCase().trim();

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
					db.none('INSERT INTO users(name, display, hash, uid) VALUES ($1, $2, $3)', [usernameLowercase, username, hash, genRandomUID()])
					.then(()=>{
				    	db.one('SELECT uid, display FROM users WHERE name= $1', usernameLowercase).
				    	then((data) => {
				    		const uid = data.uid;
				    		users.uid = usernameLowercase;
				    		res.status(200).json(data);
				    		console.log(`{$routes.register ${usernameLowercase}`, "registered");
				    	}).catch((error) =>{
				    		console.log(`{$routes.register ${usernameLowercase}`, error);
				    		res.status(400).json("An error occured while logging in");
				    	});
					})
					.catch((error)=>{
						console.log(`{$routes.register ${usernameLowercase}`, error);
						res.status(400).json("An error occurred while registering");
					});
				});
			});
    	});
	}
});

/*
* Check Logged In, Logout
*/
app.post(routes.checkLogin, (req, res) => {
	const {uid} = req.body;

	db.one('SELECT uid, display, online FROM users WHERE uid= $1', uid).
	then(user => {
		if (user.online === true){
			res.status(200).json(user);
			console.log(`${routes.checkLogin} ${uid}`, "success");
		} else {
			console.log(`${routes.checkLogin} ${uid}`, "rejected login");
			res.status(400).json("Rejected");
		}
	}).catch(error => {
		res.status(400).json("Error relogging in");
		console.log(`${routes.checkLogin} ${uid}`, error);
	});
});

app.post(routes.logOut, (req, res) => {
	const {uid} = req.body;

	db.none("UPDATE users SET online=$1 WHERE uid=$2", [false, uid]).
	then(()=>{
		res.status(200).json("Successfully logged out");
		console.log(`${routes.logOut} ${uid}`, "success");
	}).catch((error) => {
		console.log(`${routes.logOut} ${uid}`, error);
	});
});

/*
* Vision Board
*/
app.post(routes.addVisionCategory, (req, res) => {
	const {uid, name} = req.body;

	if (name === ''){
		return res.status(400).json("Please enter a category name");
	}

	db.task(t=>{
		return t.none('INSERT INTO categories(name, userid) VALUES ($1, $2)', [name, uid]).
			then(()=>{
				return t.one("SELECT id, name FROM categories ORDER BY id DESC LIMIT 1").
					then((category)=>{
						return category;
					});
				return;
			})
	}).then(data => {
		res.status(200).json(data);
		console.log(`${routes.addVisionCategory} ${uid}`, "success");
	}).catch(error => {
		console.log(`${routes.addVisionCategory} ${uid}`, error);
		res.status(400).json("An error occurred while adding category");
	});
});

app.post(routes.addVisionItem, (req, res) => {
	const {name, description, url, uid, categoryId } = req.body;

	if (name === ''){
		return res.status(400).json("Please enter a name");
	} else if(description === ''){
		return res.status(400).json("Please enter a description");
	} else if(url === ''){
		return res.status(400).json("Please enter a url");
	}


	db.task(t=>{
		return t.none('INSERT INTO visionitem(title, description, url, userid, categoryid) VALUES ($1, $2, $3, $4, $5)', [name, description, url, uid, categoryId]).
			then(()=>{
				return t.one("SELECT title, description, url, categoryid FROM visionitem ORDER BY id DESC LIMIT 1").
					then(item => {
						return item;
					});
				return;
			})
	}).then(data => {
		res.status(200).json(data);
		console.log(`${routes.addVisionItem} ${uid}`, "success"); 
	}).catch(error => {
		console.log(`${routes.addVisionItem} ${uid}`, error); 
		res.status(400).json("An error occurred while adding the vision item");  
	});
});


app.get(routes.visionBoard, (req, res) => {
	const {uid} = req.params;

	db.task(t => {
	    return t.any('SELECT id, name FROM categories WHERE userid = $1', uid).
	        then(categories => {
	        	return t.any('SELECT title, description, url, categoryid FROM visionitem WHERE userid= $1', uid).
	        		then(items => {
	        			return { categories, items};
	        		})
	        	return {categories};
	        });    
	})
	.then(data => {
		res.json(data);
		console.log(`${routes.visionBoard} ${uid}`, "success");   
	})
	.catch(error => {
		console.log(`${routes.visionBoard} ${uid}`, error);   
	});
});

/*
* Check Logged In, Logout
*/
app.post(routes.settingsProfile, (req, res) => {
	const {uid, display, currentPassword, newPassword, newPasswordRepeat} = req.body;

	db.one('SELECT COUNT(*) FROM users WHERE uid= $1', uid).
	then(data => {
		if (data.count > 0){
			if (display === '' || currentPassword === '' || newPassword === '' || newPasswordRepeat === ''){
				res.status(400).json("Please fill out all fields");
			} else if (newPassword.length < 8){
				res.status(400).json("Your password must have at least 8 charcaters");
			} else if (newPassword !== newPasswordRepeat){
				res.status(400).json("Your passwords don't match");
			} else {
				res.status(400).json("Profile changing not fully implemented");
				console.log(`${routes.settingsProfile} ${uid}`, "success");
			}
		} else {
			res.status(400).json("No user found");
			console.log(`${routes.settingsProfile} ${uid}`, "rejected");
		}
	}).catch(error => {
		res.status(400).json("Error changing profile settings");
		console.log(`${routes.settingsProfile} ${uid}`, error);
	});
});



/*
* Start app
*/
app.listen(PORT, ()=>{
	console.log("API is now running on port", PORT);
});

/*
* Generates a random user id between 10000 and 1000000
* This is private and is how requests are authenticated
*/
genRandomUID = () => {
	const max = 1000000;
	const min = 100000;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}