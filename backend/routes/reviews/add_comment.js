
const { ObjectID } = require('mongodb')
const { Reviews } = require('./../../models/review')

module.exports = async (req, res) => {
	// Add code here
	const rev_id = req.params.id

	if (!ObjectID.isValid(rev_id)) {
		res.status(404).send()
		return;
	}

	Reviews.findById(rev_id).then((rev) => {
		if (!rev) {
			res.status(404).send()
		} else {
			rev.comments.push({
				username: req.body.username,
				date: req.body.date,
        content: req.body.content
			})
			rev.save().then((result) => {
				res.send("Added Comment")
			}, (error) => {
				res.status(400).send(error)
			})
		}
	}).catch((error) => {
		res.status(500).send()
	})

}
