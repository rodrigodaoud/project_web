const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.session.currentUser) {
    res.render('index');
  } else {
    res.redirect('/index');
  }
});

module.exports = router;
