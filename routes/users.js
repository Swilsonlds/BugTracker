const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const auth = require('../helpers/auth');
const validation = require('../middleware/validate');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', auth.isLoggedIn, validation.saveUser, usersController.createUser);

router.put('/:id', auth.isLoggedIn, validation.saveUser, usersController.updateUser);

router.delete('/:id', auth.isLoggedIn, usersController.deleteUser)

module.exports = router;