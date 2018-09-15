const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DocumentAttachSchema = new Schema({
  name: {
    type: String
  },
  code: {
    type: String
  },
  description: {
    type: String
  },
  createdDate: {
    type: Date
  },
  sourceId: {
    type: String
  },
  documentType: {
    type: Number
  },
  url: {
    type: String
  },
});

module.exports = DocumentAttach = mongoose.model('DocumentAttach', DocumentAttachSchema);
