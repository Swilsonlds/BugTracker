const express = require('express');
const router = express.Router();

const bugsController = require('../controllers/bugs');
const auth = require('../helpers/auth');
const validation = require('../middleware/validate');

router.get('/', bugsController.getAll);

router.get('/:id', bugsController.getSingle);

router.post('/', validation.saveBugReport, bugsController.createBug);

router.put('/:id', validation.saveBugReport, bugsController.updateBug);

router.delete('/:id', bugsController.deleteBug)

module.exports = router;