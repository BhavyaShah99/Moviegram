
const User = require('./../../models/user')

module.exports = async (req, res) => {
  User.findById(req.params.id).then((user) => {
		if(user){
			res.send(user.followers) 
		} else{
			res.status(404).send()
		}
		// can wrap in object if want to add more properties
	}).catch((error) => {
		res.status(404).send(error) // server error
	})
}
