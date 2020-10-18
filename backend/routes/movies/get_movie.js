
const { Movies } = require('./../../models/movie')

module.exports = async (req, res) => {
  Movies.findById(req.params.id).then((movies) => {
		if(movies){
			res.send(movies) // can wrap in object if want to add more properties
		}else{
			res.status(404).send()
		}
			
	}).catch((error) => {
		res.status(404).send(error) // server error
	})
  }
