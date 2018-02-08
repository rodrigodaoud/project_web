const express = require('express');
const router = express.Router();

const User = require('../models/user');

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.session.currentUser) {
    let userInfo = { info: req.session.currentUser};
    res.render('index', userInfo);
  } else {
    res.redirect('/auth/login');
  }
});
module.exports = router;
