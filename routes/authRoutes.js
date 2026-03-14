const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas para la Intranet (Registro y Login)
router.post('/register', authController.registrarAdmin);
router.post('/login', authController.loginAdmin);

module.exports = router;