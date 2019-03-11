module.exports = (app) => {

  app.route('/')
    .get((req, res, next) => {
      req.models.Project.find(
        {published: true},
        null,
        {sort: {project_id: 1}},
        (error, projects) => {
          if (error) return next(error);
          res.render('index', {
            projects,
            user: req.session.user
          });
        }
      );
    });

  app.route('/resume')
    .get((req, res) => {
      res.download('../../../public/resume.pdf');
    });

  require('./auth')(app),
  require('./user')(app),
  require('./project')(app),

  app.route('*')
    .all((req, res) => {
      res.status(404).send();
    });

};
