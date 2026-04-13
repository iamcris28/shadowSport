const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Usamos exactamente los nombres que exportamos en el controlador: "registro" y "login"
router.post('/register', authController.registro);
router.post('/login', authController.login);

module.exports = router;