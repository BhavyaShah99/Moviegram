

// A route to check if a use is logged in on the session cookie
module.exports = async (req, res) => {
    if (req.session.user) {
        res.send({ currentUser: req.session.user });
    } else {
        res.status(401).send();
    }
}
