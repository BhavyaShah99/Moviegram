const app = module.exports = require('express')();
const {sessionCheckerAdmin} = require("../../auth")

/****** Admin routes *************************************/
app.get('/', require("./all_reviews"))
app.delete('/remove_review/', sessionCheckerAdmin, require("./remove_review"))
app.post('/add_movie', sessionCheckerAdmin, require("./../movies/add_movie"))

/*******************************************************/
