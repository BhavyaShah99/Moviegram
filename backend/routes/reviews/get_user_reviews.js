
const { Reviews } = require('./../../models/review')

module.exports = async (req, res) => {
  Reviews.find({username: req.params.username}).then((reviews) => {
		res.send(reviews)
	}, (error) => {
		res.status(404).send(error) // server error
	})
}
