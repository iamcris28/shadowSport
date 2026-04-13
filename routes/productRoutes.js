const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Importamos a los DOS guardias
const { verificarToken, verificarRol } = require('../middleware/authMiddleware');

// 🟢 RUTAS PÚBLICAS (Internet / Clientes) - No piden nada
router.get('/', productController.obtenerProductos);

// 🔴 RUTAS PRIVADAS (Intranet / Solo Admins) 
// Fíjate cómo ponemos a los dos guardias en fila: primero el token, luego el rol 'admin'
router.post('/', verificarToken, verificarRol('admin'), productController.crearProducto);
router.delete('/:id', verificarToken, verificarRol('admin'), productController.borrarProducto);

// 🟡 RUTAS EXTRANET (Ejemplo a futuro para Proveedores)
// Aquí podrías crear una ruta donde 'proveedor' y 'admin' puedan entrar a ver estadísticas de ventas, etc.
// router.get('/estadisticas', verificarToken, verificarRol('admin', 'proveedor'), ...);

module.exports = router;