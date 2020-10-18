
const User = require('./../../models/user')

module.exports = async (req, res) => {
  User.findById(req.params.id).then((user) => {
		if(user){
			res.send(user.following)
		} else{
			res.status(404).send()
		} 
	}).catch((error) => {
		res.status(404).send(error) // server error
	})
}
