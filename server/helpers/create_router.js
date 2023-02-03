const express = require('express');

const createRouter = function (collection) {

    const router = express.Router();
    // base URL: http://localhost:9000/api/cards/

    router.get('/', (req, res) => {
        collection.find().toArray()
        .then((docs) => (res.json(docs)));
    });

    router.get('/:id', (req, res) => {
        res.json(data[req.params.id]);
    });

    // router.post('/', (req, res) => {
    //     data.push(req.body);
    //     res.json(data);
    // });

    // router.put('/:id', (req, res) => {
    //     data[req.params.id] = req.body;
    //     res.json(data);
    // });

    // router.delete('/:id', (req, res) => {
    //     data.splice(req.params.id, 1);
    //     res.json(data);
    // });

    return router;

    };

module.exports = createRouter;