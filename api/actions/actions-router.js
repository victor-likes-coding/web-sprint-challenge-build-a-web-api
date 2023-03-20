// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model.js');
const { checkActionPayload, checkIfActionExistsById } = require('./actions-middlware.js');

const router = express.Router();

router.use('/:id', checkIfActionExistsById);

router.get('/', async (req, res, next) => {
  try {
    const actions = await Actions.get();
    res.json(actions);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const action = await Actions.get(req.params.id);
    if (!action) {
      next({
        status: 404,
        message: 'action not found',
      });
    } else {
      res.json(action);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', checkActionPayload, async (req, res, next) => {
  const { project_id, description, notes } = req.body;
  try {
    const newAction = await Actions.insert({ project_id, description, notes });
    res.status(201).json(newAction);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', checkActionPayload, async (req, res, next) => {
  const { project_id, description, notes } = req.body;
  try {
    const updatedAction = await Actions.update(req.params.id, { project_id, description, notes });
    res.json(updatedAction);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Actions.remove(req.params.id);
    res.json(req.action);
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
