
const User = require('./../../models/user')

module.exports = async (req, res) => {
    const username = req.body.username
    const isFollowers = req.body.isFollowers
    const followers = req.body.followers
    if (isFollowers) {
      User.findByIdAndUpdate({"_id": username}, { "followers": followers })
        .then(user => {
            if (!user) {
                res.status(404).send();
            } else {
                res.send(user);
            }
        })
        .catch(error => {
            res.status(400).send(); // bad request for changing the student.
        });
    }
    else {
      User.findByIdAndUpdate({"_id": username}, { "following": followers })
        .then(user => {
            if (!user) {
                res.status(404).send();
            } else {
                res.send(user);
            }
        })
        .catch(error => {
            res.status(400).send(); // bad request for changing the student.
        });
    }
  }
