const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  title:         {type: String},
  content:       {type: String},
  link:          {type: String}
});

module.exports = mongoose.model('Article', articleSchema);