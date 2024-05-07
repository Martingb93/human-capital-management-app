const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('./config');
const db = require("./db.json");

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.users.find(user => user.email === username);
  const userCredential = db.userCredentials.find(credential => credential.username === username);

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  if (!userCredential) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  if (userCredential.password !== password) {
    return res.status(401).json({ message: 'Invalid password' });
  }
  
  const token = jwt.sign({ id: user.id, username }, config.secret, { expiresIn: config.expiresIn });
  res.json({ token, user });
});

module.exports = router;