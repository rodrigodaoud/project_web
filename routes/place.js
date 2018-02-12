const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

const Place = require('../models/place');

router.get('/', (req, res, next) => {
  // const filter = req.body.type;
  if (req.session.currentUser) {
    Place.find({'active': true}, (err, places) => {
      if (err) {
        return next(err);
      }
      let data = {
        places: places
      };
      res.render('place/show', data);
    });
  } else {
    res.redirect('/');
  }
});

router.get('/create', (req, res, next) => {
  if (req.session.currentUser) {
    res.render('place/create');
  } else {
    res.redirect('/');
  }
});

router.post('/', upload.single('file'), (req, res, next) => {
  const createdBy = req.session.currentUser._id;
  const newName = req.body.name;
  const type = req.body.type;
  const address = req.body.address;
  let displayPicture;

  if (req.file) {
    displayPicture = {
      picPath: `/uploads/${req.file.filename}`,
      picName: req.file.picName
    };
  }
  if (newName === '' || type === '' || address === '') {
    res.render('place/create', {
      errorMessage: 'all fields are mandatory to create a new place'
    });
    return;
  }

  Place.findOne({ 'name': newName, 'active': true },
    'name',
    (err, name) => {
      if (err) {
        return next(err);
      }
      if (name !== null) {
        res.render('place/create', {
          errorMessage: 'The place already exists'
        });
        return;
      }

      const newPlace = new Place({
        createdBy,
        name: newName,
        type,
        address,
        displayPicture
      });

      newPlace.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/places');
      });
    });
});

router.post('/:id/delete/', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/');
  }
  const placeId = req.params.id;
  Place.findById(placeId, (err, place) => {
    if (err) {
      return next(err);
    }
    if (!place) {
      return res.redirect('/');
    }
    if (place.createdBy.equals(req.session.currentUser._id)) {
      place.active = false;
      place.save((err, result) => {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    } else {
      res.redirect('/');
    }
  });
});

router.get('/:id', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/');
  }
  const placeId = req.params.id;
  Place.findById(placeId, (err, places) => {
    if (err) {
      return next(err);
    }
    let data = {
      places: places
    };
    res.render('place/more', data);
  });
});

module.exports = router;
