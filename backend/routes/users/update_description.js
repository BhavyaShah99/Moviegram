
const User = require('./../../models/user')

module.exports = async (req, res) => {
    // res.send(req.body.username)
    const username = req.params.username
    const description = req.body.newDescription
      User.findByIdAndUpdate(username, { "description": description })
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
