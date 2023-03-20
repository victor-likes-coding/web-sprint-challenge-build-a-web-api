// add middlewares here related to projects
const Project = require('./projects-model');

const findProjectById = async (req, res, next) => {
  try {
    const project = await Project.get(req.params.id);
    if (!project) {
      next({
        status: 404,
        message: 'project not found',
      });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkProjectPayload = (req, res, next) => {
  const { name, description } = req.body;
  if (!name || !description) {
    next({
      status: 400,
      message: 'missing required name and description fields',
    });
  } else {
    next();
  }
};

module.exports = {
  findProjectById,
  checkProjectPayload,
};
