const { obtenerDB } = require('../config/db');

// Función para registrar una nueva venta
const crearPedido = async (req, res) => {
  try {
    const db = obtenerDB();
    
    // Recibimos el carrito de compras y el total a pagar desde el frontend (React)
    const { items, total } = req.body;

    // Gracias a tu "Guardia de Seguridad", ya sabemos quién es el usuario
    const idCliente = req.usuario.id; 

    // Armamos el "Ticket de compra"
    const nuevoPedido = {
      cliente_id: idCliente,
      articulos: items,
      total_pagado: total,
      fecha_compra: new Date(), // Guarda la fecha y hora exacta
      estado: "Procesando" // Puede cambiar a "Enviado" o "Entregado" después
    };

    // MAGIA: Aquí se crea la nueva "área" o colección llamada 'orders'
    const resultado = await db.collection("orders").insertOne(nuevoPedido);

    res.status(201).json({ 
        mensaje: "¡Venta registrada con éxito!", 
        id_pedido: resultado.insertedId 
    });

  } catch (error) {
    console.error("Error al procesar el pedido:", error);
    res.status(500).json({ error: "Error interno al procesar la compra" });
  }
};

// Función para que un cliente vea su propio historial de compras
const obtenerMisPedidos = async (req, res) => {
    try {
        const db = obtenerDB();
        const idCliente = req.usuario.id;

        // Buscamos en la sección 'orders' SOLO los recibos que le pertenecen a este cliente
        const misPedidos = await db.collection("orders").find({ cliente_id: idCliente }).toArray();
        
        res.json(misPedidos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el historial" });
    }
};

module.exports = { crearPedido, obtenerMisPedidos };