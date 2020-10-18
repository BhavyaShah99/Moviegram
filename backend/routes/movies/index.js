const app = module.exports = require('express')();

const {sessionCheckerAdmin, sessionCheckerReqUserParam} = require("../../auth")

/****** Movie routes *************************************/
app.get('/', require("./all_movies"))
app.get('/movie/:id', require("./get_movie"))
app.get('/movie_title/:title', require("./get_movie_by_name"))
app.get('/keypairs', require("./title_key_pairings"))
app.get('/genre/:genre', require("./movie_by_genre"))
app.get('/genre/', require("./all_genres"))
app.post('/movie/', sessionCheckerAdmin, require("./add_movie"))

app.get('/vote/:id/:upvoter', require('./get_voter'))
app.get('/rating/:id', require('./getRating'))

// Routes for modifying upvoting and downvoting
app.patch('/add_upvoter/:id/:username', sessionCheckerReqUserParam, require('./addUpvoter'))
app.patch('/add_downvoter/:id/:username', sessionCheckerReqUserParam, require('./addDownvoter'))

/*******************************************************/
