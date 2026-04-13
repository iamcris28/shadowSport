const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verificarToken } = require('../middleware/authMiddleware');

// 🛒 RUTA PARA COMPRAR (Crea el ticket en la colección 'orders')
// Solo pasa si el usuario tiene un Token válido
router.post('/', verificarToken, orderController.crearPedido);

// 📦 RUTA PARA VER HISTORIAL (Lee la colección 'orders')
// Solo trae los pedidos del usuario que está haciendo la petición
router.get('/mis-pedidos', verificarToken, orderController.obtenerMisPedidos);

module.exports = router;