
const { ObjectID } = require('mongodb')
const { Reviews } = require('./../../models/review')

module.exports = async (req, res) => {

    const rev_id = req.params.id
    const upvoter = req.params.username

    if (!ObjectID.isValid(rev_id)) {
  		res.status(404).send()
  		return;
  	}

  	Reviews.findById(rev_id).then((review) => {
  		if (!review) {
  			res.status(404).send()
  		} else {
        if(!review.upvoters.includes(upvoter)) {
          if(!review.upvoters.includes(upvoter) && !review.downvoters.includes(upvoter)) {
            review.upvoters.push(upvoter)
            review.upvotes = review.upvotes + 1
            review.save().then((result) => {
      				res.send("Added upvoter")
      			}, (error) => {
      				res.status(400).send(error)
      			})
          } else if (review.downvoters.includes(upvoter)) {
            const index = review.downvoters.indexOf(upvoter)
            review.downvoters.splice(index, 1)
            review.downvotes = review.downvotes - 1
            review.upvoters.push(upvoter)
            review.upvotes = review.upvotes + 1
            review.save().then((result) => {
      				res.send("Added upvoter")
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
