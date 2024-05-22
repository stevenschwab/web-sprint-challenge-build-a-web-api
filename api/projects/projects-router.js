const express = require('express');
const Projects = require('./projects-model');
const { validateProject, validateCompletedField } = require('./projects-middleware');

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

router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next)
})

router.put('/:id', validateProject, validateCompletedField, (req, res, next) => {
    const { id } = req.params;
    Projects.update(id, req.body)
        .then(updatedProject => {
            if (updatedProject) {
                res.json(updatedProject)
            } else {
                res.status(404).json({ message: "No project with given id" })
            }
        })
        .catch(next)
})

router.delete('/:id', (req, res, next) => {
    Projects.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(204).json()
            } else {
                res.status(404).json({ message: "No project with the given id" })
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