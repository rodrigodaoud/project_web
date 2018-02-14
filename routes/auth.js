const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

const User = require('../models/user');

const bcrypt = require('bcrypt');
const bcryptSalt = 10;

// GET AND POST LOGIN PAGE
// router.get('/index', function (req, res, next) {
//   if (req.session.currentUser) {
//     res.redirect('/places');
//   } else {
//     res.render('index');
//   }
// });

router.post('/login', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/places');
  }
  const username = req.body.username;
  let password = req.body.password;

  if (username === '' || password === '') {
    const data = {
      errorMessage: 'enter your username and password to login'
    };
    return res.render('index', data);
  }
  User.findOne({ 'username': username }, (err, user) => {
    if (err || !user) {
      res.render('index', {
        errorMessage: 'the username does not exist'
      });
      return;
    }
    if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res.redirect('/places');
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

router.post('/signup', upload.single('file'), (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/places');
  }

  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const name = req.body.name;
  let displayPicture;

  if (req.file) {
    displayPicture = {
      picPath: `/uploads/${req.file.filename}`,
      picName: req.body.picName
    };
  }

  if (username === '' || password === '') {
    res.render('auth/signup', {
      signupErrorMessage: 'Indicate a username and a password to sign up'
    });
    return;
  }

  User.findOne({ 'username': username }, 'username', (err, user) => {
    if (err) {
      return next(err);
    }
    if (user !== null) {
      res.render('auth/signup', {
        signupErrorMessage: 'The username already exists'
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      username,
      password: hashPass,
      email,
      name,
      displayPicture
    });

    newUser.save((err) => {
      if (err) {
        return next(err);
      }
      req.session.currentUser = newUser;

      res.redirect('/places');
    });
  });
});

// POST LOGOUT
router.post('/logout', (req, res, next) => {
  if (req.session.currentUser) {
    req.session.currentUser = null;
  }
  res.redirect('/');
});

module.exports = router;
