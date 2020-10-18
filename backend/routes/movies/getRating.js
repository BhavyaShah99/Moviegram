
const { Movies } = require('./../../models/movie')

module.exports = async (req, res) => {
  Movies.findById(req.params.id, {upvotes: 1, downvotes: 1}).then((movies) => {
		res.send(movies) // can wrap in object if want to add more properties
	}, (error) => {
		res.status(404).send(error) // server error
	})
  }
