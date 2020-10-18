const { Reviews } = require('../../models/review')

module.exports = async (req, res) => {
  Reviews.find({movie_id: req.params.movie_id}).then((reviews) => {
		res.send(reviews)
	}, (error) => {
		res.status(500).send(error) // server error
	})
}
