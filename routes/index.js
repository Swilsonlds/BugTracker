const express = require('express');
const router = express.Router();
const passport = require('passport')
require('../controllers/auth');

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

router.get('/', (req, res) => {
    res.send('<a href="/auth/google">Login with Google</a>')
});

router.get('/auth/google',
passport.authenticate('google', { scope: ['email', 'profile'] }) 
);

router.get('/google/callback',
passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure'
}) 
);

router.get('/auth', isLoggedIn,  (req, res) => {
    res.send('Welcome to my Bug Tracker API!<br><br>Add "/api-docs" to the end of the URL to view all available API requests.')
})

router.get('/auth/failure', (req, res) => {
    res.sendStatus('An error has occurred')
})
router.use('/bugs', require('./bugs'));

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;