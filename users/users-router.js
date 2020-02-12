const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('./users-model.js');

// protect the /api/users endpoint so only authenticated users can access it
// api/users
router.get('/', auth, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

function auth(req, res, next) {
	const {username, password} = req.headers;
	console.log(username);
	Users.findBy({ username })
	    .first()
	    .then(user => {
	      if (user && bcrypt.compareSync(password, user.password)) {
	      	console.log("Success!")
	        next();
	      } else {
	        res.status(401).json({ message: 'Invalid Credentials' });
	      }
	    })
	    .catch(error => {
	      res.status(500).json(error);
	    });
}

module.exports = router;
