const router = require('express').Router();
const bcyrpt = require('bcryptjs');
const Users = require('../users/users-model.js');
// api/auth/register
router.post('/register', (req, res) => {
  let user = req.body;
  console.log(user)

  const hash = bcyrpt.hashSync(user.password, 12);
  console.log(hash)
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
// api/auth/login
router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      console.log(user, password)
      if (user && bcyrpt.compareSync(password, user.password)) { //compare to the password thats coming back to the password in the database
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
