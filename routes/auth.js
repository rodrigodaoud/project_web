const express = require('express');
const router = express.Router();

const User = require('../models/user');

const bcrypt = require('bcrypt');
const bcryptSalt = 10;

// GET AND POST LOGIN PAGE
router.get('/index', function (req, res, next) {
  if (req.session.currentUser) {
    res.redirect('/');
  } else {
    res.render('index');
  }
});

router.post('/index', (req, res, next) => {
  const username = req.body.username;
  let password = req.body.password;

  if (username === '' || password === '') {
    res.render('index', {
      errorMessage: 'enter your username and password to login'
    });
    return;
  }
  User.findOne({ 'username': username }, (err, user) => {
    if (err || !user) {
      res.render('index', {
        errorMessage: 'the username does not exist'
      });
      return;
    }
    if (bcrypt.compareSync(password, user.password)) {
      // Save the login in the session!
      req.session.currentUser = user;
      res.redirect('/');
    } else {
      res.render('index', {
        errorMessage: 'incorrect password'
      });
    }
  });
});

// GET AND POST SIGNUP PAGE
router.get('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
  } else {
    res.render('auth/signup');
  }
});

router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const name = req.body.name;

  if (username === '' || password === '') {
    res.render('auth/signup', {
      errorMessage: 'Indicate a username and a password to sign up'
    });
    return;
  }

  User.findOne({ 'username': username }, 'username', (err, user) => {
    if (err) {
      return next(err);
    }
    if (user !== null) {
      res.render('auth/signup', {
        errorMessage: 'The username already exists'
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      username,
      password: hashPass,
      email,
      name
    });

    newUser.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  });
});

// POST LOGOUT
router.post('/logout', (req, res, next) => {
  if (req.session.currentUser) {
    req.session.currentUser = null;
    res.redirect('/index');
  } else {
    res.redirect('/index');
  }
});

module.exports = router;
