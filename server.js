const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
const pgp = require('pg-promise')({});
const uuidv4 = require('uuid/v4');

const LOCALHOST = false;
const PORT = LOCALHOST ? 3006 : process.env.PORT;
const app = express();


const cn = LOCALHOST ? "postgres://ekqanpemwceqcd:none@localhost:5432/mygoals" : process.env.DATABASE_URL;
const db = pgp(cn);

const ROUTE_FOLDER = 'routes';

const {handleLogin} = require(`./${ROUTE_FOLDER}/handleLogin`);
const {handleRegister} = require(`./${ROUTE_FOLDER}/handleRegister`);
const {handleLogout} = require(`./${ROUTE_FOLDER}/handleLogout`);
const {handleCheckLogin} = require(`./${ROUTE_FOLDER}/handleCheckLogin`);

const {handleEditVisionCategory} = require(`./${ROUTE_FOLDER}/handleEditVisionCategory`);
const {handleEditVisionItem} = require(`./${ROUTE_FOLDER}/handleEditVisionItem`);
const {handleAddVisionCategory} = require(`./${ROUTE_FOLDER}/handleAddVisionCategory`);
const {handleAddVisionItem} = require(`./${ROUTE_FOLDER}/handleAddVisionItem`);
const {handleAddTask} = require(`./${ROUTE_FOLDER}/handleAddTask`);
const {handleVisionBoard} = require(`./${ROUTE_FOLDER}/handleVisionBoard`);
const {handleNote} = require(`./${ROUTE_FOLDER}/handleNote`);
const {handleAddNote} = require(`./${ROUTE_FOLDER}/handleAddNote`);
const {handleDeleteVisionItem} = require(`./${ROUTE_FOLDER}/handleDeleteVisionItem`);
const {handleDeleteTask} = require(`./${ROUTE_FOLDER}/handleDeleteTask`);
const {handleDeleteVisionCategory} = require(`./${ROUTE_FOLDER}/handleDeleteVisionCategory`);
const {handleCompleteVisionItem} = require(`./${ROUTE_FOLDER}/handleCompleteVisionItem`);
const {handleCompleteTask} = require(`./${ROUTE_FOLDER}/handleCompleteTask`);

const {handleAddGoal} = require(`./${ROUTE_FOLDER}/handleAddGoal`);
const {handleGoals} = require(`./${ROUTE_FOLDER}/handleGoals`);
const {handleDeleteGoal} = require(`./${ROUTE_FOLDER}/handleDeleteGoal`);
const {handleEditGoal} = require(`./${ROUTE_FOLDER}/handleEditGoal`);
const {handleHabits} = require(`./${ROUTE_FOLDER}/handleHabits`);
const {handleTasks} = require(`./${ROUTE_FOLDER}/handleTasks`);

const {handleUpdateHabit} = require(`./${ROUTE_FOLDER}/handleUpdateHabit`);

const {handleRequest, handleError} = require('./routeUtils');

/*
* Middlewares for express
*/
app.use(cors()); //Allow cross origin resource sharing
app.use(bodyParser.json());
app.use((req, res, next) => {
	if (handleRequest(db)(req, res)){
		next();
	} else {
		res.status(400).json("Invalid session key");
	}
});

/*
* Routes
*/
app.post("/login", (req, res) => handleLogin(uuidv4, db, bcrypt)(req, res));
app.post("/register", (req, res) => handleRegister(uuidv4, db, bcrypt)(req, res));
app.post("/logout", (req, res) => handleLogout(db)(req, res));
app.post("/checklogin", (req, res) => handleCheckLogin(db)(req, res)); 

app.post("/updateprogress", (req, res) => handleUpdateProgress(db)(req, res)); 

app.post("/editvisioncategory", (req, res) => handleEditVisionCategory(db)(req, res));
app.post("/editvisionitem", (req, res) => handleEditVisionItem(db)(req, res));
app.post("/addvisioncategory", (req, res) => handleAddVisionCategory(db)(req, res));
app.post("/addvisionitem", (req, res) => handleAddVisionItem(db)(req, res));
app.post("/add-task", (req, res) => handleAddTask(db)(req, res));
app.post("/visionboard", (req, res) => handleVisionBoard(db)(req, res));
app.post("/note", (req, res) => handleNote(db)(req, res));
app.post("/addnote", (req, res) => handleAddNote(db)(req, res));

app.post("/addgoal", (req, res) => handleAddGoal(db)(req, res));
app.post("/goals", (req, res) => handleGoals(db)(req, res));
app.post("/deletegoal", (req, res) => handleDeleteGoal(db)(req, res));
app.post("/editgoal", (req, res) => handleEditGoal(db)(req, res));
app.post("/updatehabit", (req, res) => handleUpdateHabit(db)(req, res));
app.post("/habits", (req, res) => handleHabits(db)(req, res));
app.post("/tasks", (req, res) => handleTasks(db)(req, res));
app.post("/deletevisionitem", (req, res) => handleDeleteVisionItem(db)(req, res));
app.post("/deletevisioncategory", (req, res) => handleDeleteVisionCategory(db)(req, res));
app.post("/complete-vision-item", (req, res) => handleCompleteVisionItem(db)(req, res));
app.post("/complete-task", (req, res) => handleCompleteTask(db)(req, res));
app.post("/delete-task", (req, res) => handleDeleteTask(db)(req, res));

/*
* Start app
*/
app.listen(PORT, ()=>{
	console.log("API is now running on port", PORT);
});