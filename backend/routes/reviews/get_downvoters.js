
const { ObjectID } = require('mongodb')
const { Reviews } = require('./../../models/review')

module.exports = async (req, res) => {

	const id = req.params.id


	if (!ObjectID.isValid(req.params.id)) {
		res.status(404).send()
		return;
	}

	Reviews.findById(id).then((review) => {
		res.send(review.downvoters)
	}).catch((error) => {
		res.status(404).send(error)
	})
}
