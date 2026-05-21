const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Usamos exactamente los nombres que exportamos en el controlador: "registro" y "login"
router.post('/register', authController.registro);
router.post('/login', authController.login);

// NUEVAS RUTAS: Flujo de recuperación de contraseña
router.post('/forgot-password', authController.solicitarRecuperacion);
router.post('/reset-password', authController.restablecerPassword);

module.exports = router;