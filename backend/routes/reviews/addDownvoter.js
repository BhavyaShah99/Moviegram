
const { ObjectID } = require('mongodb')
const { Reviews } = require('./../../models/review')

module.exports = async (req, res) => {

    const rev_id = req.params.id
    const downvoter = req.params.username

    if (!ObjectID.isValid(rev_id)) {
  		res.status(404).send()
  		return;
  	}

  	Reviews.findById(rev_id).then((review) => {
  		if (!review) {
  			res.status(404).send()
  		} else {
        if(!review.downvoters.includes(downvoter)) {
          if(!review.downvoters.includes(downvoter) && !review.upvoters.includes(downvoter)) {
            review.downvoters.push(downvoter)
            review.downvotes = review.downvotes + 1
            review.save().then((result) => {
      				res.send("Added downvoter")
      			}, (error) => {
      				res.status(400).send(error)
      			})
          } else if (review.upvoters.includes(downvoter)) {
            const index = review.upvoters.indexOf(downvoter)
            review.upvoters.splice(index, 1)
            review.upvotes = review.upvotes - 1
            review.downvoters.push(downvoter)
            review.downvotes = review.downvotes + 1
            review.save().then((result) => {
      				res.send("Added downvoter")
      			}, (error) => {
      				res.status(400).send(error)
      			})
          }
        } else {
          res.send("Already exists")
        }
  		}
  	}).catch((error) => {
  		res.status(500).send()
  	})
}
