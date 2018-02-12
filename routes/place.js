const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

const User = require('../models/user');
const Place = require('../models/place');

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
    Place.find({'active': true}, (err, places) => {
      if (err) {
        return next(err);
      }
      res.render('place/show', {places: places});
    });
  } else {
    res.redirect('/');
  }
});

router.post('/places', upload.single('file'), (req, res, next) => {
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

  Place.findOne({ 'name': newName },
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

router.post('/places/:id/delete/', (req, res, next) => {
  const placeId = req.params.id;
  const archivedPlace = {
    active: false
  };
  Place.findByIdAndUpdate(
    placeId,
    archivedPlace, (err, places) => {
      if (err) {
        return next(err);
      }
      res.redirect('/places');
    });
});

// router.get('/places/:id', (req, res, next) => {
//   const placeId = req.params.id;

//   if (req.session.currentUser) {
//     Place.find({placeId}, (err, places) => {
//       if (err) {
//         return next(err);
//       }
//       res.render('place/more', {places: places});
//     });
//   } else {
//     res.redirect('/');
//   }
// });

module.exports = router;
