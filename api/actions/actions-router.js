const express = require('express');
const Actions = require('./actions-model');

const router = express.Router()

router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.json(actions)
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Actions.get(req.params.id)
        .then(action => {
            if (action) {
                res.json(action)
            } else {
                res.status(404).json({ message: "No action with the given id" })
            }
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Actions.insert(req.body)
        .then()
        .catch(next)
})

router.use((error, req, res, next) => { // eslint-disable-line
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: "Something bad happened in the actions-router",
        stack: error.stack,
    })
})

module.exports = router;