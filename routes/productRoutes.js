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

// 👇 ¡ESTA ES LA LÍNEA QUE FALTABA PARA EL ERROR 404! 👇
router.put('/:id', verificarToken, verificarRol('admin'), productController.actualizarProducto);

router.delete('/:id', verificarToken, verificarRol('admin'), productController.borrarProducto);

// Ruta para que el EMPLEADO actualice SOLO la oferta (No puede eliminar)
router.put('/:id/oferta', verificarToken, verificarRol('admin', 'empleado'), productController.actualizarOferta);


// 🟡 RUTAS EXTRANET (Ejemplo a futuro para Proveedores)
// router.get('/estadisticas', verificarToken, verificarRol('admin', 'proveedor'), ...);

module.exports = router;