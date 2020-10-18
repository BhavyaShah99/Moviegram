
const { Movies } = require('./../../models/movie')

module.exports = async (req, res) => {
  const username = req.params.upvoter
  Movies.findById(req.params.id).then((movies) => {
        const thumbs = {thumbUp: false, thumbDown: false}
        if(movies.upvoters.includes(username)){
            thumbs["thumbUp"] = true
        }
        if(movies.downvoters.includes(username)){
            thumbs["thumbDown"] = true
        }

		res.send(thumbs) // can wrap in object if want to add more properties
	}).catch((error) => {
		res.status(404).send(error) // server error
	})
  }
