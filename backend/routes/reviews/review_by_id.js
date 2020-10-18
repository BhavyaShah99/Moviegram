
const { ObjectID } = require('mongodb')
const { Reviews } = require('./../../models/review')

module.exports = async (req, res) => {

  const rev_id = req.params.id

  if (!ObjectID.isValid(rev_id)) {
    res.status(404).send()
    return;
  }

  Reviews.findById(rev_id).then((review) => {

    if (!review) {
      res.status(404).send()
    } else {
      res.send(review)
    }
  })
}
