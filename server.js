/* server.js, with mongodb API and static directories */
'use strict';
const log = console.log
const path = require('path')

const express = require('express')
// starting the express server
const app = express();

// mongoose and mongo connection
const mongoose = require('mongoose')

// import the mongoose models
// models

// to validate object IDs
const { ObjectID } = require('mongodb')

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors());

require('dotenv').config();


/***********************************************/
const uri = `mongodb+srv://harsh:${process.env.dbpass}@cluster0-mujm7.mongodb.net/moviegram?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).catch(
	error => console.log(error)
);
/***********************************************/

// express-session for managing user sessions
const session = require('express-session')
app.use(bodyParser.urlencoded({ extended: true }));

/*** Session handling **************************************/
// Create a session cookie
app.use(session({
    secret: 'moviesarefun',
    resave: false,
    saveUninitialized: false,
    cookie: {
        // maxAge: 600000,
        httpOnly: true
    }
}));

/*********************************************************/

/*** API Routes below ************************************/

app.use('/api/session', require('./backend/routes/session'))
app.use('/api/users', require('./backend/routes/users'))
app.use('/api/movies', require('./backend/routes/movies'))
app.use('/api/reviews', require('./backend/routes/reviews'))
app.use('/api/signup', require('./backend/routes/signup'))
app.use('/api/login', require('./backend/routes/login'))
app.use('/api/admin', require('./backend/routes/admin'))
app.use('/api/images', require('./backend/routes/images'))

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/frontend/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/frontend/build/index.html");
});


/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})
