const {Project} = require('../controllers');

module.exports = (app) => {

  app.route('/projects/:slug')
    .get(Project.show);

};
