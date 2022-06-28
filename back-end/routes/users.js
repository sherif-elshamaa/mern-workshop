const express = require('express')
const User = require('../schema/User')
const bcrypt = require('bcrypt')
const passport = require('passport')


const router = express.Router();

const checkauth = (req, res, next) => {
    const authenticated = typeof req.user !== undefined;
    if (!req.isAuthenticated()) {
        console.log(`not logged in : ${authenticated}`);
        res.status(400).json({ msg: 'Authentication failed' });
        return;
    }
    next()
}

router.post('/register', async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ userName: body.userName })
    if (user) {
        return res.status(401).send({ message: "User-Name already registered" })
    }


    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(body.password, salt, async (err, hash) => {
            const password = hash;

            const newUser = new User({
                name: body.name,
                age: body.age,
                userName: body.userName,
                password: password
            })
            const user = await newUser.save();
            console.log(user)
        })
    })
    res.status(201).send({ message: "register successs" })

})


router.post('/login', async (req, res, next) => {
    try {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            // if (!user) return res.redirect('/login');

            req.logIn(user, function (err) {
                if (err) {
                    res.status(500).json(err);
                    return next(err);
                }
                console.log(req.user);
                return res.json({ user: user, authenticated: true });
            });
        })(req, res, next);
    } catch (err) {
        console.log(err.message);
    }
});

router.get('/profile', checkauth, (req, res) => {

})


module.exports = router;