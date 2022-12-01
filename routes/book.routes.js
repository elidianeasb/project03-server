const router = require('express').Router();
const Book = require('../models/Book.model');
const User = require('../models/User.model');
const Service = require('../models/Service.model')
// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const { Types } = require("mongoose");

router.post('/bookings', isAuthenticated, (req, res, next) => {
    const { local, date, service } = req.body;
    const userId = req.payload._id

    Book.create({ local, date, service, user: userId })
        .then(response => res.json(response))
        .catch(err => res.json(err));
})

router.put('/bookings/:id/accept', isAuthenticated, async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id)
        if (book.status !== 'pending') {
            res.status(400).json({ errorMessage: "Booking cannot be accepted" });
        } else {
            const authenticatedUser = req.payload._id
            await User.findById(authenticatedUser)
                .then(async user => {
                    if (user.accountType === "admin") {
                        await Book.findByIdAndUpdate(id, { status: "accepted" });
                        res.status(200).json({ message: `The book with id ${id} was accepted successfully` })
                    }else{
                        res.status(403).json({ errorMessage: "Operation not allowed" });
                    }
                })
                .catch(err => res.json(err));
        }
    } catch (error) {
        next(error)
    }
})

router.get('/bookings', isAuthenticated, (req, res, next) => {
    const authenticatedUser = req.payload._id
    User.findById(authenticatedUser)
        .then(user => {
            if (user.accountType === "client") {
                Book.find({ user: Types.ObjectId(authenticatedUser) })
                    .populate('service')
                    .then(allBookings => res.json(allBookings))
                    .catch(err => res.json(err));
            } else if (user.accountType === "admin") {
                Book.find()
                    .populate('service')
                    .then(allBookings => res.json(allBookings))
                    .catch(err => res.json(err));
            }
        })
        .catch(err => res.json(err));
})

router.delete('/bookings/:id', isAuthenticated, async (req, res, next) => {
    try {
        const { id } = req.params;
        await Book.findByIdAndUpdate(id, { status: "canceled" }); // não deletar, tem que mudar o status pra canceled

        res.status(200).json({ message: `The book with id ${id} was deleted successfully` })

    } catch (error) {
        next(error)
    }
})


module.exports = router;



