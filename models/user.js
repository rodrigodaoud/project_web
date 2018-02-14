const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  displayPicture: {
    picPath: {
      type: String,
      default: 'http://www.clker.com/cliparts/5/e/b/1/1207432038755052764snow%20boarding%20black.svg.hi.png'
    },
    picName: {
      type: String,
      default: 'Placeholder Image'
    }
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
