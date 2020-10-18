

// Our own express middleware to check for
// an active user on the session cookie (indicating a logged in user.)
const authenticate = (req, res, next) => {
	if (req.session.user) {
		User.findById(req.session.user).then((user) => {
			if (!user) {
				return Promise.reject()
			} else {
				req.user = user
				next()
			}
		}).catch((error) => {
			res.status(401).send("Unauthorized")
		})
	} else {
		res.status(401).send("Unauthorized")
	}
}

const sessionCheckerReqUserParam = (req, res, next) => {
    if (!req.session.user || req.session.user != req.params.username) {
        res.redirect('/');
    } else {
        next(); // next() moves on to the route.
    }
};

const sessionCheckerReqUserBody = (req, res, next) => {
    if (!req.session.user || req.session.user != req.body.username) {
        res.redirect('/');
    } else {
        next(); // next() moves on to the route.
    }
};

const sessionCheckerAdmin = (req, res, next) => {
    if (req.session.user != "admin") {
        res.redirect('/');
    } else {
        next(); // next() moves on to the route.
    }
};



module.exports = { sessionCheckerReqUserBody, sessionCheckerReqUserParam, authenticate, sessionCheckerAdmin}
