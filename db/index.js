const mongoose = require('mongoose');

const connect = (url, opts = {}) => {
  return mongoose.connect(
    url,
    {
      ...opts,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
  );
};

module.exports = connect;
