
const { Reviews } = require('./../../models/review')

module.exports = async (req, res) => {

  const username = req.body.username
  const title = req.body.movie_title
  const content = req.body.content
  const spoilers = req.body.spoilers
  const date = req.body.date
  const movie_id = req.body.movie_id

  const newReview = {
    username: username,
    movie_title: title,
    content: content,
    spoilers: spoilers,
    comments: [],
    upvotes: 0,
    downvotes: 0,
    upvoters: [],
    downvoters: [],
    date: date,
    movie_id: movie_id
  }

  const review = new Reviews(newReview)

  review.save().then((result) => {
    res.send("Added Review")
  }, (error) => {
    res.status(400).send(error)
  })

}
