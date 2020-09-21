const express = require('express');
const usersController = require('../controllers/users.js');
const router = express.Router();

router.post('/register/', usersController.createNewUser);
router.post('/auth/', usersController.authUser);

module.exports = router;