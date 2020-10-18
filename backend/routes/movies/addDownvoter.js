
const { Movies } = require('./../../models/movie')

module.exports = async (req, res) => {

    const movie_id = req.params.id
    const downvoter = req.params.username

  	Movies.findById(movie_id).then((movie) => {
  		if (!movie) {
  			res.status(404).send()
  		} else {
        if(!movie.downvoters.includes(downvoter)) {
          if(!movie.downvoters.includes(downvoter) && !movie.upvoters.includes(downvoter)) {
            movie.downvoters.push(downvoter)
            movie.downvotes = movie.downvotes + 1
            movie.save().then((result) => {
      				res.send("Added downvoter")
      			}, (error) => {
      				res.status(400).send(error)
      			})
          } else if (movie.upvoters.includes(downvoter)) {
            const index = movie.upvoters.indexOf(downvoter)
            movie.upvoters.splice(index, 1)
            movie.upvotes = movie.upvotes - 1
            movie.downvoters.push(downvoter)
            movie.downvotes = movie.downvotes + 1
            movie.save().then((result) => {
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
