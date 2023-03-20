// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model.js');
const { findProjectById, checkProjectPayload } = require('./projects-middleware.js');
const router = express.Router();

router.use('/:id', findProjectById);

router.get('/', async (req, res, next) => {
  try {
    const projects = await Projects.get();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    res.json(req.project);
  } catch (err) {
    next(err);
  }
});

router.post('/', checkProjectPayload, async (req, res, next) => {
  const { name, description, completed = false } = req.body;
  try {
    const newProject = await Projects.insert({ name, description, completed });
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', checkProjectPayload, async (req, res, next) => {
  try {
    const updatedProject = await Projects.update(req.params.id, { ...req.body });
    res.json(updatedProject);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Projects.remove(req.params.id);
    res.json(req.project);
  } catch (err) {
    next(err);
  }
});

router.use('/:id/actions', findProjectById, async (req, res, next) => {
  try {
    const actions = await Projects.getProjectActions(req.params.id);
    res.json(actions);
  } catch (err) {
    next(err);
  }
});

// eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
