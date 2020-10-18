
const User = require('./../../models/user')

module.exports = async (req, res) => {
    User.find().then((users) => {
      res.send(users) 
    }, (error) => {
      res.status(500).send(error) // server error
    })
  }
