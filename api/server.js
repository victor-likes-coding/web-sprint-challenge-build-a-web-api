const express = require('express');
const server = express();

const projectRouter = require('./projects/projects-router.js');
const actionRouter = require('./actions/actions-router.js');

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
server.use(express.json());
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

module.exports = server;
