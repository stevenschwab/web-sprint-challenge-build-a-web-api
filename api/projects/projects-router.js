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

router.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: 'Something bad happened in the projects-router',
        stack: error.stack
    })
})

module.exports = router;