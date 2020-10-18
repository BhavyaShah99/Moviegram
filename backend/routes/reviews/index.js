
const app = module.exports = require('express')();

const {sessionCheckerReqUserBody, sessionCheckerReqUserParam} = require("../../auth")

/****** Review routes *************************************/

app.get('/', require("./all_reviews"))
app.get('/:id', require('./review_by_id'))
app.get('/user_reviews/:username', require("./get_user_reviews"))
app.get('/downvoters/:id', require("./get_downvoters"))
app.get('/upvoters/:id', require("./get_upvoters"))
app.get('/:movie_title/movie_title', require("./get_reviews_by_movie_title"))


app.get('/:movie_id/movie_id', require("./get_reviews_by_movie_id"))


// Routes for modifying upvoting and downvoting
app.patch('/add_upvoter/:id/:username', sessionCheckerReqUserParam, require('./addUpvoter'))
app.patch('/add_downvoter/:id/:username', sessionCheckerReqUserParam,require('./addDownvoter'))

// Routes related to review comenting
app.patch('/add_comment/:id', sessionCheckerReqUserBody, require('./add_comment'))

// Route to add review
app.post('/add_review', sessionCheckerReqUserBody, require('./add_review'))
/*******************************************************/
