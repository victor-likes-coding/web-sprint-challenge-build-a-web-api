// add middlewares here related to actions
const Actions = require('./actions-model');

const checkActionPayload = (req, res, next) => {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    next({
      status: 400,
      message: 'missing required project_id, description, and notes fields',
    });
  } else {
    next();
  }
};

const checkIfActionExistsById = async (req, res, next) => {
  try {
    const project = await Actions.get(req.params.id);
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

module.exports = {
  checkActionPayload,
  checkIfActionExistsById,
};
