
const User = require('./../../models/user')

module.exports = async (req, res) => {
    User.findById(req.params.id, {password: 0}).then((user) => {
      res.send(user)
    }).catch((error) => {
      res.status(500).send(error) // server error
    })
  }
