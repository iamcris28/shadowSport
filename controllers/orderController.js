const { obtenerDB } = require('../config/db');
const { ObjectId } = require('mongodb');
const { enviarCorreo } = require('../config/email'); // <-- NUEVO: Importamos el servicio de correo

// 1. Crear nueva orden (Cuando el cliente paga)
const crearOrden = async (req, res) => {
    try {
        const db = obtenerDB();
        const { ObjectId } = require('mongodb'); // Aseguramos tener ObjectId para buscar
        
        // 🌟 CORRECCIÓN: Buscamos el correo real del usuario en la base de datos usando su ID
        // Nota: Dependiendo de tu middleware, puede ser req.usuario.id o req.user.id
        const idUsuario = req.usuario.id || req.usuario._id; 
        const usuarioReal = await db.collection('users').findOne({ _id: new ObjectId(idUsuario) });
        
        // Si lo encuentra usa su correo, si no, deja un aviso
        const correoCliente = usuarioReal ? usuarioReal.email : "correo_no_encontrado@shadowsport.com";

        // Empaquetamos los datos con el correo real
        const nuevaOrden = {
            user_email: correoCliente, // <--- ¡Aquí está la magia!
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
// En tu archivo controllers/orderController.js
const obtenerMisOrdenes = async (req, res) => {
    try {
        const db = obtenerDB();
        const { ObjectId } = require('mongodb');
        
        // 1. Tomamos el ID del usuario que viene en el token
        const idUsuario = req.usuario.id || req.usuario._id; 
        
        // 2. Buscamos al usuario real en la base de datos
        const usuarioReal = await db.collection('users').findOne({ _id: new ObjectId(idUsuario) });
        
        if (!usuarioReal) {
             return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // 3. Buscamos las órdenes usando el correo que encontramos en la BD
        const misPedidos = await db.collection('orders').find({ user_email: usuarioReal.email }).toArray();
        
        res.json(misPedidos);
    } catch (error) {
        console.error("Error al obtener mis pedidos:", error);
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

// 4. Actualizar estado (Para Intranet) + ENVÍO DE CORREO
const actualizarEstadoOrden = async (req, res) => {
    try {
        const db = obtenerDB();
        const idOrden = req.params.id;
        const nuevoEstado = req.body.status;

        // 1. Buscamos la orden primero para saber a qué correo avisar
        const orden = await db.collection('orders').findOne({ _id: new ObjectId(idOrden) });
        
        if (!orden) {
            return res.status(404).json({ error: "Orden no encontrada" });
        }

        // 2. Actualizamos el estado en la base de datos
        const resultado = await db.collection('orders').updateOne(
            { _id: new ObjectId(idOrden) },
            { $set: { status: nuevoEstado } }
        );

        if (resultado.modifiedCount === 1) {
            
            // 3. Redactamos el correo de aviso
            const asunto = `Actualización de tu pedido en ShadowSport - Orden #${idOrden.slice(-6)}`;
            const cuerpoHtml = `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
                <h2 style="color: #000; text-align: center;">¡Hola!</h2>
                <p>Queremos informarte que el estado de tu pedido ha cambiado.</p>
                <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #f5a623; margin: 20px 0;">
                  <p style="margin: 0; font-size: 16px;"><strong>Nuevo Estado:</strong> ${nuevoEstado}</p>
                </div>
                <p>Puedes revisar los detalles completos ingresando a "Mis Pedidos" en nuestra tienda.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #666; text-align: center;">ShadowSport Originals - Instituto Tecnológico de Veracruz</p>
              </div>
            `;

            // 4. Enviamos el correo usando la dirección que guardaste al crear la orden
            enviarCorreo(orden.user_email, asunto, cuerpoHtml);

            res.json({ mensaje: "Estado actualizado exitosamente y correo enviado al cliente" });
        } else {
            res.json({ mensaje: "El estado ya era el mismo, no se enviaron notificaciones" });
        }
    } catch (error) {
        console.error("Error al actualizar:", error);
        res.status(500).json({ error: "Error interno al actualizar estatus" });
    }
};

module.exports = { crearOrden, obtenerMisOrdenes, obtenerTodasLasOrdenes, actualizarEstadoOrden };