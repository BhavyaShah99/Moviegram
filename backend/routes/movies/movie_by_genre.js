const { Movies } = require('./../../models/movie')

module.exports = async (req, res) => {
    const finder = `genres.${req.params.genre}`
    Movies.find({
        [finder]: true
       }).then((movies) => {
        res.send(movies) // can wrap in object if want to add more properties
    }, (error) => {
        res.status(500).send(error) // server error
    })
       }