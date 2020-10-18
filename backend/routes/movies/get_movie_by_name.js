
const { Movies } = require('./../../models/movie')

module.exports = async (req, res) => {
  Movies.findOne({title: req.params.title}).then((movie) => {
		res.send(movie) // can wrap in object if want to add more properties
	}, (error) => {
		res.status(404).send(error) // server error
	})
  }
