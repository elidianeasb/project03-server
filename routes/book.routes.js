const router = require('express').Router();
const Book = require('../models/Book.model');
const Service = require('../models/Service.model')
// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const { Types, model } = require("mongoose");

router.post('/books', isAuthenticated, (req, res, next) => {
    const { name, local, date, contact, service } = req.body;
    const userId = req.payload._id

    Book.create({ name, local, contact, date, service, user: userId })
        .then(response => res.json(response))
        .catch(err => res.json(err));
})

router.get('/books', (req, res, next) => {
    Book.find()
        .populate('service')
        .then(allBooks => res.json(allBooks))
        .catch(err => res.json(err));
})

router.get('/books/:userId', isAuthenticated, (req, res, next) => {
    const userId = req.params.userId
    console.log(userId)
    Book.find({user: Types.ObjectId(userId)})
        .populate('service')
        .then(allBooks => res.json(allBooks))
        .catch(err => res.json(err));
})


module.exports = router;



