const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('../helpers/auth');

require('../auth/auth')

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

// router.get('/', (req, res) => {
//     res.send('Welcome to my Bug Tracker API!<br><br>Add "/api-docs" to the end of the URL to view all available API requests.')
// });

router.get('/', (req, res) => {
    res.send('<a href="/auth/google">Login with Google</a><br><br>Logging in will allow you to modify the database.<br><br>If you want to view the documentation without being able to modify the database, click <a href="../api-docs">here</a>')
})

router.use('/bugs', require('./bugs'));
router.use('/users', require('./users'));
router.use('/auth', require('./auth'));

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;