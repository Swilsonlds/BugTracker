const mongodb = require('../db/connect');
const passport = require('passport');

function isLoggedIn(req, res, next) {
    req.user ? next() : res.status(401).send("Unauthorized: You need to be logged in to access this endpoint.");;
}

module.exports = {
    isLoggedIn
}