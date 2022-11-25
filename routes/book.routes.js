const router = require('express').Router();
const Book = require('../models/Book.model');
const Service = require('../models/Service.model')

router.post('/books', (req, res, next) => {
    const {name, local, date, contact, service} = req.body;

    Book.create({ name, local, contact, date, service })
    .then(response => res.json(response))
    .catch(err => res.json(err));
})

router.get('/books', (req, res, next) => {
    Book.find()
    .populate('service')
    .then(allBooks => res.json(allBooks))
    .catch(err => res.json(err));

})

module.exports = router;



