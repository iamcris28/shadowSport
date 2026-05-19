const { obtenerDB } = require('../config/db');

// 1. Crear nueva orden (Cuando el cliente paga)
const crearOrden = async (req, res) => {
    try {
        const db = obtenerDB();
        
        // Empaquetamos los datos exactamente como los manda el checkout
        const nuevaOrden = {
            // ¡AQUÍ ESTÁ LA CORRECCIÓN! (Cambiamos req.user por req.usuario)
            user_email: req.usuario.email, 
            items: req.body.items, 
            total: req.body.total, 
            shipping_address: req.body.shipping_address, 
            payment_method: req.body.payment_method, 
            status: 'Pendiente de Envío', 
            date: new Date() 
        };

        const resultado = await db.collection('orders').insertOne(nuevaOrden);
        res.status(201).json({ mensaje: "Orden creada con éxito", orderId: resultado.insertedId });
        
    } catch (error) {
        console.error("Error al procesar el pedido:", error);
        res.status(500).json({ error: "Error interno al procesar el pago" });
    }
};

// 2. Ver mis pedidos (Para el cliente normal)
const obtenerMisOrdenes = async (req, res) => {
    try {
        const db = obtenerDB();
        // ¡AQUÍ TAMBIÉN CORREGIMOS! (req.usuario.email)
        const misPedidos = await db.collection('orders').find({ user_email: req.usuario.email }).toArray();
        res.json(misPedidos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener pedidos" });
    }
};

// 3. Ver TODAS las ventas (Para el ADMIN)
const obtenerTodasLasOrdenes = async (req, res) => {
    try {
        const db = obtenerDB();
        const ordenes = await db.collection('orders').find().sort({ date: -1 }).toArray(); 
        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener historial de ventas" });
    }
};

// NUEVA FUNCIÓN: Actualizar estado (Para Intranet)
const actualizarEstadoOrden = async (req, res) => {
    try {
        const db = obtenerDB();
        const { ObjectId } = require('mongodb'); // Necesario para buscar por ID
        const idOrden = req.params.id;
        const nuevoEstado = req.body.status;

        const resultado = await db.collection('orders').updateOne(
            { _id: new ObjectId(idOrden) },
            { $set: { status: nuevoEstado } }
        );

        if (resultado.modifiedCount === 1) {
            res.json({ mensaje: "Estado actualizado exitosamente" });
        } else {
            res.status(404).json({ error: "Orden no encontrada" });
        }
    } catch (error) {
        console.error("Error al actualizar:", error);
        res.status(500).json({ error: "Error interno" });
    }
};

// No olvides exportarla sumándola a tu lista de exportación actual:
 module.exports = { crearOrden, obtenerMisOrdenes, obtenerTodasLasOrdenes, actualizarEstadoOrden };
