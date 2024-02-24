const express = require('express');
const router = express.Router();
const passport = require('passport')
require('../controllers/auth');


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

router.get('/', (req, res) => {
    res.send('Welcome to my Bug Tracker API!<br><br><a href="/auth/google">Login with Google</a><br><br>Add "/api-docs" to the end of the URL to view all available API requests.')
});

router.get('/auth/google',
passport.authenticate('google', { scope: ['email', 'profile'] }) 
);

router.get('/auth/google',
passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure'
}) 
);

router.use('/bugs', require('./bugs'));

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;