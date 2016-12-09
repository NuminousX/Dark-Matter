// required modules
const express = require ('express');
const bodyParser = require('body-parser');
const Sequelize = require('Sequelize');
const bcrypt = require('bcrypt-nodejs');
const app = express()

//connecting to the database
const database = new Sequelize('ethereal', 'postgres', 'falafeldragon', {
	host: 'localhost',
	dialect: 'postgres'
})

//setting the view engine to read from views and read pug
app.set("view engine", "pug")
app.set("views", __dirname + "/views")

// tell express to use the static folder
app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true }))

///////////////////////////////////////////
/*THIS SECTION IS FOR ALL THE GET ROUTES */
///////////////////////////////////////////

// purely for test purposes
app.get("/ping", (req, res) => {
	
	res.send("Things went to hell seven ways to shit sunday")
})

// get and render the main page, which is the log in page
app.get("/", (req, res) => {

	res.render("index")
})


// get and render the account creation page
app.get("/registration", (req, res) => {

	res.render("registration")
})

//Make the server listen on part 8080
app.listen(8947, ( ) => {
	console.log("verifying data....")
	console.log("Dynamic content mapped")
	console.log("checking Data uplink...")
	console.log("Data uplink succesfull")
	console.log("Server operational")
})