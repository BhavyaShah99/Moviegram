const { Reviews } = require('./../../models/review')

module.exports = async (req, res) => {
    Reviews.find().then((reviews) => {
      res.send(reviews) // can wrap in object if want to add more properties
    }, (error) => {
      res.status(404).send(error) // server error
    })
  }
