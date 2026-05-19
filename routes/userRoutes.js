const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verificarToken, verificarRol } = require('../middleware/authMiddleware');

router.get('/', verificarToken, verificarRol('admin'), userController.obtenerTodosLosUsuarios);
// Nuevas rutas:
router.put('/:id', verificarToken, verificarRol('admin'), userController.actualizarRolUsuario);
router.delete('/:id', verificarToken, verificarRol('admin'), userController.borrarUsuario);

module.exports = router;