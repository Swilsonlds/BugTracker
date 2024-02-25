const mongodb = require('../db/connect');
const passport = require('passport');

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

module.exports = {
    isLoggedIn
}