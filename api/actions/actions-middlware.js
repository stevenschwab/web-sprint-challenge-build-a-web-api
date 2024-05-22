const Projects = require('../projects/projects-model');

function validateAction(req, res, next) {
    const { project_id, description, notes } = req.body;

    if (
        !project_id || 
        typeof project_id !== 'number'
    ) {
        return res.status(400).json({ message: "project_id field is required" })
    } else if (
        !description || 
        typeof description !== 'string' || 
        !description.trim().length
    ) {
        return res.status(400).json({ message: "description field is required" })
    } else if (
        !notes || 
        typeof notes !== 'string' || 
        !notes.trim().length
    ) {
        return res.status(400).json({ message: "notes field is required" })
    }
    req.description = description.trim()
    req.notes = notes.trim()
    next();
}

module.exports = {
    validateAction,
}