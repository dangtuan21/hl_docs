const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ReviewSchema = new Schema({
  //1=Course;2=Tutor
  revieweeType: {
    type: Number,
  },
  revieweeId: {
    type: String,
  },

  //userId
  reviewerId: {
    type: String,
  },
  point: {
    type: Number,
  },
  comment: {
    type: String,
  },
  createdDate: {
    type: Date
  },
  
});

module.exports = Review = mongoose.model('review', ReviewSchema);
