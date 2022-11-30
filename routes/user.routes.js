const router = require('express').Router();
const User = require('../models/User.model');
const { isAuthenticated } = require('../middleware/jwt.middleware')

// Display User profile

router.get('/account/:userId', isAuthenticated, async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId)
        res.status(201).json(user);

    } catch (error) {
        console.log(error)
    }

});

// Edit User

router.put('/edit/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { name } = req.body;
        const { email } = req.body;
        const { phone } = req.body;

        const userUpdate = await User.findByIdAndUpdate(userId,
            { name, email, phone },
            { new: true }
        );

        res.status(200).json(userUpdate);

    } catch (error) {
        next(error);
    }
})


module.exports = router;


