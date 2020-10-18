const User = require('./../../models/user')
const bcrypt = require('bcryptjs');


module.exports = async (req, res) => {
    /**** STILL NEED TO IMPLEMENT */
    const username = req.body.username
    const password = req.body.password

    // Use the static method on the User model to find a user
    // by their email and password

    User.getUserByUsernamePassword(username, password).then((user) => {
	    if (!user) {
            res.redirect('/login');
        } else {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            res.send({ currentUser: user._id });
          }
    }).catch((error) => {
		res.status(400).redirect('/login');
    })
  }
