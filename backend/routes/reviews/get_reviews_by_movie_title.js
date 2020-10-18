const { Reviews } = require('../../models/review')

module.exports = async (req, res) => {
  Reviews.find({movie_title: req.params.movie_title}).then((reviews) => {
		res.send(reviews)
	}, (error) => {
		res.status(500).send(error) // server error
	})
}
