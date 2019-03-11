
const mongoose = require('mongoose');
const imageSchema = require('./image');
const validator = require('validator');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
      validate: [function (value) {
        return value.length <= 120;
      }, 'Description is too long (120 max)']
    },
    published: {
      type: Boolean,
      required: true
    },
    demo_link: {
      type: String,
      required: true,
      validate: [(value) => validator.isURL(value, {require_tld: false}), 'Not a valid URL']
    },
    repository: {
      type: String,
      required: true,
      validate: [(value) => validator.isURL(value, {require_tld: false}), 'Not a valid URL']
    },
    technologies: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      set(value) {
        return value.toLowerCase().replace(' ', '-');
      }
    },
    image: imageSchema
  },
  {timestamps: true}
);

projectSchema.static({
  list(callback) {
    this.find({}, null, {sort: {_id: -1}}, callback);
  }
});

module.exports = mongoose.model('Project', projectSchema);
