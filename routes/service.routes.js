const router = require('express').Router();

const Service = require('../models/Service.model');
const Book = require('../models/Book.model')

router.post('/services', (req, res, next) => {
    const { type, name, price, description, duration, book } = req.body;

    Service.create({ type, name, price, description, duration, book })
/*     .then(newService => {
        return Book.findByIdAndUpdate(book, {$push: { service: { service: newService._id}}} )
    }) */
    
    .then(response => res.json(response))
    .catch(err => res.json(err));
})

router.get('/services', (req, res) => {
    Service.find()
    //.populate('service')
    .then(allServices => res.json(allServices))
    .catch(err => res.json(err));

})

module.exports = router;
