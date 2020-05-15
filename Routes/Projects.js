const router = require('express').Router();
const db = require('../data/db-helper');

router.get('/', (req, res) => {
    return db.getAllProjects()
        .then(resp => {
            return res.status(200).json(resp);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
});

router.get('/:id', (req, res) => {
    return db.getProjectByID(req.params.id)
        .then(project => {
            return project ? res.status(200).json(project) : res.status(404).json({ message: `Project not found.` });
        })
        .catch(error => {
            return res.status(500).json(error);
        })
});

router.post('/', (req, res) => {
    let { name, desc, completed } = req.body;

    if (!name) return res.status(500).json({ message: "Provide a name in the request's body." });
    if (!desc) desc = '';
    if (!completed) completed = 'false';

    return db.addProject({
        name, desc, completed
    })
        .then((resp) => {
            return db.getProjectByID(resp[0])
                .then(resp => {
                    return res.status(201).json(resp);
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
        })
        .catch(error => {
            return res.status(500).json(error);
        });
})

module.exports = router;