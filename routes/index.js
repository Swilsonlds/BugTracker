const express = require('express');
const router = express.Router();

router.use('/bugs', require('./bugs'));

router.get('/', (req, res) => {
    res.send("Landing Page")
})

module.exports = router;