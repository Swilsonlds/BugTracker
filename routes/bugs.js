const express = require('express');
const router = express.Router();

const bugsController = require('../controllers/bugs');

router.get('/', bugsController.getAll);

router.get('/:id', bugsController.getSingle);

router.post('/', bugsController.createBug);

router.put('/:id', bugsController.updateBug);

router.delete('/:id', bugsController.deleteBug)

module.exports = router;