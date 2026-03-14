const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Importamos a nuestro guardia de seguridad
const verificarToken = require('../middleware/authMiddleware');

// 🟢 Rutas PÚBLICAS (Extranet)
// Lisset y los clientes pueden ver el catálogo sin necesidad de Token
router.get('/', productController.obtenerProductos);
router.get('/:id', productController.obtenerProductoPorId);

// 🔴 Rutas PRIVADAS (Intranet)
// Agregamos "verificarToken" en medio. Si el guardia dice "pasa", se ejecuta el controlador.
router.post('/', verificarToken, productController.crearProducto);
router.put('/:id', verificarToken, productController.actualizarProducto);
router.delete('/:id', verificarToken, productController.borrarProducto);

module.exports = router;