
const { Movies } = require('./../../models/movie')

module.exports = async (req, res) => {
    Movies.find().then((movies) => {
      res.send(movies) // can wrap in object if want to add more properties
    }, (error) => {
      res.status(404).send(error) // server error
    })
  }
