const express = require('express');
const router = express.Router();
const passport = require('passport')
require('../auth/auth');


const auth = require('../helpers/auth');
const validation = require('../middleware/validate');

router.get('/google', 
    passport.authenticate('google', { scope: ['email', 'profile']})
);

router.get('/callback', 
    passport.authenticate('google', {
        successRedirect: 'protected',
        failureRedirect: 'failure'
    })
)

router.get('/failure', (req, res) => {
    res.send("We couldn't log you into Google. Sorry!")
})

router.get('/protected', auth.isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}, You've been successfully logged in.<br><br>You may now add, update, and delete bug reports!<br><br>Click <a href="../api-docs">here</a> to view the API docs`);
})

router.get('/logout', (req, res) => {
    req.logOut();
    req.session.destroy();
    res.redirect("/")
})

module.exports = router;