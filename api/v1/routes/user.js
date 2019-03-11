const {User} = require('../controllers');

module.exports = (app) => {

  app.route('/login')
    .get(User.login)
    .post(User.authenticate);

  app.route('/logout')
    .get(User.logout);

  app.route('/register')
    .post(User.register);

  app.route('/api/v1/users')
    .get(User.list);

  app.route('/api/v1/users/:id')
    .put(User.edit);

};
