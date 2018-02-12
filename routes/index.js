const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

const User = require('../models/user');
const Place = require('../models/place');

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.session.currentUser) {
    res.render('index');
  } else {
    res.redirect('/index');
  }
});

module.exports = router;
