const express = require('express');
const router = express.Router();

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

router.get('/places/create', (req, res, next) => {
  if (req.session.currentUser) {
    res.render('place/create');
  } else {
    res.redirect('/');
  }
});

router.get('/places', (req, res, next) => {
  // const filter = req.body.type;
  if (req.session.currentUser) {
    Place.find({}, (err, places) => {
      if (err) {
        return next(err);
      }
      res.render('place/show', {places: places});
    });
  } else {
    res.redirect('/');
  }
});

router.post('/places', (req, res, next) => {
  const name = req.body.name;
  const type = req.body.type;
  const address = req.body.address;

  if (name === '' || type === '' || address === '') {
    res.render('place/create', {
      errorMessage: 'all fields are mandatory to create a new place'
    });
    return;
  }

  Place.findOne({ 'name': name },
    'name',
    (err, user) => {
      if (err) {
        return next(err);
      }
      if (name !== null) {
        res.render('place/create', {
          errorMessage: 'The place already exists'
        });
        return;
      }

      const newPlace = Place({
        name,
        type,
        address
      });
      newPlace.save((err) => {
        if (err) {
          next(err);
        }
        res.redirect('/places');
      });
    });
});

module.exports = router;
