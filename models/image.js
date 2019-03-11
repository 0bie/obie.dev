const mongoose = require('mongoose');
const validator = require('validator');

const imageSchema = new mongoose.Schema(
  {
    src: {
      type: String,
      required: true,
      validate: [(value) => validator.isURL(value, {require_tld: false}), 'Not a valid URL']
    },
    alt: {
      type: String,
      trim: true,
      required: true,
      default: 'Sample alternate text'
    }
  }
);

module.exports = imageSchema;
