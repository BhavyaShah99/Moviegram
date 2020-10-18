const app = module.exports = require('express')();
const {sessionCheckerReqUserBody, sessionCheckerReqUserParam} = require("../../auth")



/****** User routes ************************************ */
app.get('/:id', require("./get_user"))
app.get('/', require("./all_users"))
app.get('/get_friends/:id', require("./get_user_following"))
app.put('/user_update_follow/', sessionCheckerReqUserBody, require('./update_user_follow'))
app.get('/get_followers/:id', require("./get_user_followers"))
app.put('/user_update_description/:username',sessionCheckerReqUserParam, require('./update_description'))
app.put('/user_update_favoriteGenres/:username',sessionCheckerReqUserParam, require('./update_favoriteGenres'))
/*******************************************************/
