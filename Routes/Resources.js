const router = require('express').Router();
const db = require('../data/db-helper');

router.get('/', (req, res) => {
    return db.getAllResources()
        .then(resp => {
            return res.status(200).json(resp);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
});

router.get('/:id', (req, res) => {
    return db.getResourceByID(req.params.id)
        .then(resource => {
            return resource ? res.status(200).json(resource) : res.status(404).json({ message: `Resource not found.` });
        })
        .catch(error => {
            return res.status(500).json(error);
        })
});

router.post('/', (req, res) => {
    let { name, desc } = req.body;

    if (!name) return res.status(500).json({ message: "Provide a name in the request's body." });
    if (!desc) desc = '';

    return db.addResource({
        name, desc
    })
        .then((resp) => {
            return db.getResourceByID(resp[0])
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