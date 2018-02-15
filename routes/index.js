const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/places');
  } else {
    const data = {
      showPlaces: false
    };
    res.render('index', data);
  }
});

module.exports = router;
