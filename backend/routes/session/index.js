
const app = module.exports = require('express')();

app.get('/', require("./check_session"))
app.get('/logout', require("./destroy_session"))