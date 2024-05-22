const Projects = require('./projects-model')

function logger(req, res, next) {
    const date = new Date();
    console.log(`
        REQUEST METHOD: ${req.method}
        REQUEST URL: ${req.originalUrl}
        TIMESTAMP; ${date.toLocaleString()}
    `);
    next();
}

function validateProject(req, res, next) {
    const { name, description, completed } = req.body;
    if (
        !name || 
        typeof name !== 'string' || 
        !name.trim().length
    ) {
        return res.status(400).json({ message: "Name field missing" })
    } else if (
        !description || 
        typeof description !== 'string' ||
        !description.trim().length
    ) {
        return res.status(400).json({ message: "Description field missing" })
    } else if (completed !== undefined && typeof completed !== 'boolean') {
        return res.status(400).json({ message: "Completed field must be a boolean" })
    }
    req.name = name.trim()
    req.description = description.trim()
    next();
}

function validateCompletedField(req, res, next) {
    const { completed } = req.body;
    if (
        (req.method === 'PUT' && 
        completed === undefined) || 
        typeof completed !== 'boolean'
    ) {
        return res.status(400).json({ message: "Completed field is required" })
    }
    next();
}

function validateProjectId(req, res, next) {
    Projects.get(req.params.id)
        .then(project => {
            if (!project) {
                res.status(404).json({ message: "Project ID not found" })
            }
            next();
        })
        .catch(next)
}

module.exports = {
    validateProject,
    validateCompletedField,
    logger,
    validateProjectId,
}