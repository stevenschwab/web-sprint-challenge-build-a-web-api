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
        return res.status(400).json({ message: "Complete field must be a boolean" })
    }
    req.name = name.trim()
    req.description = description.trim()
    next();
}

module.exports = {
    validateProject
}