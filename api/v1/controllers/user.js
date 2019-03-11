/**
 * `GET` list of users
 */

exports.list = (req, res, next) => {

  req.models.User.find((error, users) => {
    if (error) return next(error);
    res.send({users});
  });

};

/**
 * `GET` login route
 */

exports.login = (req, res, next) => { // eslint-disable-line no-unused-vars

  if (req.session.admin || req.session.user) {
    return res.redirect('/');
  }
  res.render('login', {user: req.session.user});

};

/**
 * `GET` logout route
 */

exports.logout = (req, res, next) => {

  req.session.destroy((error) => {
    if (error) return next(error);
    res.redirect('/');
  });

};

/**
 * `POST` authenticate route
 */

exports.authenticate = (req, res, next) => {

  if (!req.body.username || !req.body.password) {
    return res.render('login', {
      error: 'Please enter your username and password.'
    });
  }

  req.models.User.findOne({
    username: req.body.username,
    password: req.body.password
  }, (error, user) => {
    if (error) return next(error);
    if (!user) {
      return res.render('login', {error: 'Incorrect username & password combination'});
    }
    req.session.user = user;
    req.session.admin = user.admin;
    res.redirect('/admin');
  });

};

/**
 * POST `/register`
 */
exports.register = (req, res, next) => {

  if (!req.body.username || !req.body.password || !req.body.full_name) {
    return res.render('login', {
      error: 'Please enter your username, full name, and password.'
    });
  }

  const user = {
    admin: true,
    username: req.body.username,
    password: req.body.password,
    full_name: req.body.full_name
  };

  req.models.User.create(user, (error, userResponse) => {
    if (error) return next(error);
    req.session.user = userResponse;
    req.session.admin = userResponse.admin;
    res.redirect('/admin');
  });

};

/**
 * `PUT /api/v1/users/:id` API
 */

exports.edit = (req, res, next) => {

  if (!req.params.id) return next(new Error('No note ID.'));
  if (!req.body.info) return next(new Error('No info payload.'));

  req.models.User.findOneAndUpdate(
    {_id: req.session.user._id},
    {$set: req.body.info},
    (error, doc) => {
      if (error) return next(error);
      res.send(doc);
    }
  );

};
