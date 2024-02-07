const express = require('express');
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

router.get('/', (req, res) => {
    res.send('Welcome to my Bug Tracker API!<br><br>Add "/api-docs" to the end of the URL to view all available API requests.')
});

router.use('/bugs', require('./bugs'));

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;