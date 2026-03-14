const { ObjectId } = require('mongodb');
const { obtenerDB } = require('../config/db');

// Función para obtener todos los productos (GET)
const obtenerProductos = async (req, res) => {
  try {
    const db = obtenerDB();
    
    // req.query captura todo lo que venga después del "?" en la URL
    // Ejemplo: /api/products?category=Running&attributes.sizes_mx=26
    const filtros = req.query;
    
    // Le pasamos los filtros directamente a MongoDB
    const productos = await db.collection("products").find(filtros).toArray();
    
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// Función para obtener un solo producto por ID (GET)
const obtenerProductoPorId = async (req, res) => {
  try {
    const db = obtenerDB();
    const id = req.params.id;
    const producto = await db.collection("products").findOne({ _id: new ObjectId(id) });
    
    if (producto) res.json(producto);
    else res.status(404).json({ error: "Producto no encontrado" });
  } catch (error) {
    res.status(500).json({ error: "ID inválido" });
  }
};

// Función para crear un producto (POST)
const crearProducto = async (req, res) => {
  try {
    const db = obtenerDB();
    const nuevoProducto = req.body;
    const resultado = await db.collection("products").insertOne(nuevoProducto);
    res.status(201).json({ mensaje: "Producto guardado con éxito", id: resultado.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Error al guardar el producto" });
  }
};

// Función para actualizar un producto (PUT)
const actualizarProducto = async (req, res) => {
  try {
    const db = obtenerDB();
    const id = req.params.id;
    const datosActualizados = req.body;
    const resultado = await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: datosActualizados }
    );

    if (resultado.matchedCount === 0) return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ mensaje: "Producto actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

// Función para borrar un producto (DELETE)
const borrarProducto = async (req, res) => {
  try {
    const db = obtenerDB();
    const id = req.params.id;
    const resultado = await db.collection("products").deleteOne({ _id: new ObjectId(id) });

    if (resultado.deletedCount === 0) return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ mensaje: "Producto eliminado del catálogo" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

// Exportamos todas las funciones para poder usarlas en las rutas
module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  borrarProducto
};