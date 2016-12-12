// required modules
const express = require ('express');
const bodyParser = require('body-parser');
const Sequelize = require('Sequelize');
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');
const app = express()

//connecting to the database
const database = new Sequelize('traveler', 'postgres', 'falafeldragon', {
	host: 'localhost',
	dialect: 'postgres'
})

//setting the view engine to read from views and read pug
app.set("view engine", "pug")
app.set("views", __dirname + "/views")

// tell express to use the static folder
app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
	secret: 'Is submission not preferable to extinction?',
	resave: true,
	saveUninitialized: false
}));


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

/////////////////////////////////////////////////////////////////////////////////
/*THIS GET SECTION IS TO SEPARATE THE GALAXY AND SOLAR SYSTEM FROM THE PLANETS*/
////////////////////////////////////////////////////////////////////////////////

// get and render the galaxymap, which for now it limited to our milky way
app.get("/galaxymap", (req, res) => {

	res.render("galaxymap")
})

// get and render our solarsystem
app.get("/solarmap", (req, res) => {

	res.render("solarmap")
})

///////////////////////////////////////////
/*THIS GET SECTION IS FOR ALL THE PLANET ROUTES */
///////////////////////////////////////////

app.get("/Earth", (req, res) => {

	res.render("Earth")
})

app.get("/Mars", (req, res) => {

	res.render("Mars")
})

app.get("/Venus", (req, res) => {

	res.render("Venus")
})

app.get("/Mercury", (req, res) => {

	res.render("Mercury")
})

app.get("/Jupiter", (req, res) => {

	res.render("Jupiter")
})

app.get("/Saturn", (req, res) => {

	res.render("Saturn")
})

app.get("/Uranus", (req, res) => {

	res.render("Uranus")
})

app.get("/Neptune", (req, res) => {

	res.render("Neptune")
})




///////////////////////////////////////////
/*THIS SECTION IS FOR ALL THE POST ROUTES */
///////////////////////////////////////////



app.post("/registration", (req, res) => {


	bcrypt.hash(req.body.password, null, null, (err, hash) => {
		if (err) throw err;

		User.create ({
			username: req.body.username,
			password: hash,
			email: req.body.email,
			firsname: req.body.firstname,
			lastname: req.body.lastname
		}).then( () => {
			console.log("Welcome traveler, your new journey awaits")
			res.redirect('/')
		})



	})
})

// listening to my index pug and once log in is verified redirect to the profile
app.post("/index", bodyParser.urlencoded({extended: true}), function (request, response) {

	if(request.body.username.length === 0) {

		console.log("verification error")

		response.redirect('/?message=' + encodeURIComponent("I'm sorry but no username was found"));
		return;
	}

	if(request.body.password.length === 0) {

		console.log("autherisation error")

		response.redirect('/?message=' + encodeURIComponent("We will need a password to keep your data safe"));
		return;
	}

	User.findOne({
		where: {
			username: request.body.username
		}

	}).then(function (user) {

		bcrypt.compare(request.body.password, user.password, function(err, res) {
   		// res == true
			if (user !== null && res) {
				request.session.user = user;
				response.redirect('galaxymap');

			} else {
				console.log("no user found")
			}
		});
	}),

	function (error) {
		response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
	};
});


///////////////////////////////////////////
/*THIS SECTION IS WHERE I DEFINE MY MODELS AND SYNC MY DATABASE */
///////////////////////////////////////////

// Defining a  model for the user this will create a table in the existing database
let User = database.define('user', {
	username: Sequelize.STRING,
	password: Sequelize.STRING,
	email: {type: Sequelize.STRING, unique: true},
	firstname: Sequelize.STRING,
	lastname: Sequelize.STRING

})

//syncing the database 
database.sync({force: true}).then( ( ) => {
	console.log("database synced and ready to go")

	User.create ({
		username: "NuminousX",
		password: "one",
		email: "a@a",
		firsname: "a",
		lastname: "b"
	})

})

//Make the server listen on part 8000
app.listen(8000, ( ) => {
	console.log("verifying data....")
	console.log("Dynamic content mapped")
	console.log("checking Data uplink...")
	console.log("Data uplink succesfull")
	console.log("Server operational")
})