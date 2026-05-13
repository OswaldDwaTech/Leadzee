const express = require('express');
const router = express.Router();
const authController = require('../controllers/inscription');

// Route : POST /api/auth/register
router.post('/register', authController.register);
// Route : POST /api/auth/login
router.post('/login', authController.login);

// Route : GET /api/auth/me/:id
router.get('/me/:id', authController.getMe);

module.exports = router;