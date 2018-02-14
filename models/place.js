const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
  name: String,
  address: String,
  type: String,
  active: {
    type: Boolean,
    default: true
  },
  displayPicture: {
    picPath: {
      type: String,
      default: 'https://bloximages.chicago2.vip.townnews.com/billingsgazette.com/content/tncms/assets/v3/editorial/c/a5/ca5baefc-d922-54e1-9429-abd16a353bce/59cced6868919.image.jpg'
    },
    picName: {
      type: String,
      default: 'Placeholder Image'
    }
  },
  additionalPicture: [{
    picPath: String,
    picName: String
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
