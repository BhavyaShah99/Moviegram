
const User = require('./../../models/user')

module.exports = async (req, res) => {
    User.findById(req.params.user_id).then((user) => {
      if(user){
        res.send(user.image_url)
      } else{
        res.status(404).send()
      }
    }, (error) => {
      res.status(500).send(error) // server error
    })
  }
