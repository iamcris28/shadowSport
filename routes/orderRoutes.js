const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Importamos a los guardias de seguridad
const { verificarToken, verificarRol } = require('../middleware/authMiddleware');

// RUTAS (Aquí es donde daba el error en la línea 8)
// 1. Ruta para que un cliente compre
router.post('/', verificarToken, orderController.crearOrden);

// 2. Ruta para que un cliente vea su propio historial
router.get('/mis-pedidos', verificarToken, orderController.obtenerMisOrdenes);

// 3. Ruta para Administrador Y Empleado (¡Modificado!)
router.get('/todas', verificarToken, verificarRol('admin', 'empleado'), orderController.obtenerTodasLasOrdenes);

// 4. NUEVA RUTA: Para cambiar el estado del envío (PUT)
router.put('/:id/estado', verificarToken, verificarRol('admin', 'empleado'), orderController.actualizarEstadoOrden);

module.exports = router;