const app = module.exports = require('express')();

/****** User routes ************************************ */
app.post('/', require("./login"))
/*******************************************************/