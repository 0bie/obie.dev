exports.list = (req, res, next) => {

  req.models.Project.list((error, projects) => {
    if (error) return next(error);
    res.send({projects});
  });

};

exports.show = (req, res, next) => {

  if (!req.params.slug) return next(new Error('No project slug.'));
  req.models.Project.findOne({slug: req.params.slug}, (error, project) => {
    if (error) return next(error);
    if (!project.published) return res.status(401).send(); // Unauthorized
    res.render('project', project);
  });

};
