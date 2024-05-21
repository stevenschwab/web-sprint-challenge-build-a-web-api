const express = require('express');
const Projects = require('./projects-model');

const router = express.Router()

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Projects.get(id)
        .then(project => {
            if (project) {
                res.json(project)
            } else {
                res.status(404).json({ message: "Project not found!" })
            }
        })
        .catch(next)
})

router.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: 'Something bad happened in the projects-router',
        stack: error.stack
    })
})

module.exports = router;