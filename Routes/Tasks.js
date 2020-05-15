const router = require('express').Router();
const db = require('../data/db-helper');

router.get('/', (req, res) => {
    return db.getAllTasks()
        .then(resp => {
            return res.status(200).json(resp);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
});

router.get('/:id', (req, res) => {
    return db.getTaskByID(req.params.id)
        .then(task => {
            return task ? res.status(200).json(task) : res.status(404).json({ message: `Task not found.` });
        })
        .catch(error => {
            return res.status(500).json(error);
        })
});

router.post('/', (req, res) => {
    let { desc, notes, project_id, completed } = req.body;

    if (!desc || !project_id) return res.status(500).json({ message: "Provide a 'desc' and a 'project_id' in the request's body." });
    if (!notes) notes = '';
    if (!completed) completed = 'false';

    return db.addTask({
        desc, notes, completed, project_id
    })
        .then((resp) => {
            return db.getTaskByID(resp[0])
                .then(resp => {
                    return res.status(201).json(resp);
                })
                .catch(error => {
                    return res.status(500).json({error});
                });
        })
        .catch(error => {
            return res.status(500).json(error);
        });
})

module.exports = router;