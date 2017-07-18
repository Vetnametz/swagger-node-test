const mongoose = require('mongoose');

const feedSchema = mongoose.Schema({
  title:         {type: String},
  articles:       [{
    type: mongoose.Schema.ObjectId,
    ref: 'Article'
  }],
  dateCreated:   {
    type: Date,
    default: Date.now
  },
  dateUpdated:   {type: Date},
  userName:        {type: String},
  URL: {
    type: String
  }
});

module.exports = mongoose.model('Feed', feedSchema);