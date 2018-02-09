const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Place = require('../models/place');

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.session.currentUser) {
    let userInfo = { info: req.session.currentUser};
    res.render('index', userInfo);
  } else {
    res.redirect('/auth/login');
  }
});

router.get('/places/create', (req, res, next) => {
  if (req.session.currentUser) {
    res.render('place/create');
  } else {
    res.redirect('/auth/login');
  }
});

router.get('/places/show', (req, res, next) => {
  if (req.session.currentUser) {
    Place.find({}, (err, places) => {
      if (err) { return next(err); }
      res.render('place/show', { places: places });
    });
  } else {
    res.redirect('/auth/login');
  }
});

router.post('/places/show', (req, res, next) => {
  // const productId = req.query.id;
  let newPlace = Place({
    name: req.body.name,
    type: req.body.type,
    address: req.body.address
  });
  newPlace.save((err) => {
    if (err) {
      next(err);
    }
    res.redirect('/places/show');
  });
});

module.exports = router;
