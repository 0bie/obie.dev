const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set({debug: true});

const connect = (url, opts = {}) => {
  return mongoose.connect(
    url,
    {
      ...opts,
      useCreateIndex: true,
      useNewUrlParser: true
    }
  );
};

module.exports = connect;
