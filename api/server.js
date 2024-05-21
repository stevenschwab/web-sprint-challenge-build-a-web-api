const express = require('express');
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');
const { logger } = require('./projects/projects-middleware');

const server = express();

server.use(express.json());
server.use(logger)
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

module.exports = server;
