const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'google',

  // Optional depending on the providers
  // httpAdapter: 'https'
  apiKey: 'YOUR_API_KEY'
  // formatter: null
};
const geocoder = NodeGeocoder(options);

const Place = require('../models/place');

router.get('/', (req, res, next) => {
  // const filter = req.body.type;
  if (req.session.currentUser) {
    Place.find({'active': true}).populate('createdBy').exec((err, places) => {
      if (err) {
        return next(err);
      }
      let data = {
        places: places,
        showPlaces: true
      };
      res.render('place/show', data);
    });
  } else {
    res.redirect('/');
  }
});

router.get('/create', (req, res, next) => {
  if (req.session.currentUser) {
    const data = {
      showPlaces: false
    };
    res.render('place/create', data);
  } else {
    res.redirect('/');
  }
});

router.post('/', upload.single('file'), (req, res, next) => {
  geocoder.geocode(req.body.address, function (err, res) {
    if (err) {
      return next(err);
    }
    console.log(res);
  });
  const createdBy = req.session.currentUser._id;
  const newName = req.body.name;
  const type = req.body.type;
  const address = req.body.address;
  const description = req.body.description;
  let displayPicture;

  if (req.file) {
    displayPicture = {
      picPath: `/uploads/${req.file.filename}`,
      picName: req.body.picName
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
        displayPicture,
        description
      });

      newPlace.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/places');
      });
    });
});

router.post('/:id', upload.single('file'), (req, res, next) => {
  const placeId = req.params.id;

  if (!req.session.currentUser) {
    return res.redirect('/');
  } else if (!req.file) {
    return res.redirect('/places/' + placeId);
  } else {
    Place.findById(placeId, (err, place) => {
      if (err) {
        return next(err);
      }
      if (!place) {
        return res.redirect('/');
      }
      const additionalPicture = {
        picPath: `/uploads/${req.file.filename}`
      };

      place.additionalPicture.push(additionalPicture);
      place.save((err, result) => {
        if (err) {
          return next(err);
        }
        res.redirect('/places/' + placeId);
      });
    });
  }
});

router.post('/:id/delete/', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/');
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
      places: places,
      showPlaces: false
    };
    res.render('place/more', data);
  });
});

module.exports = router;
