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
    
    // Interceptamos los datos antes de guardarlos
    const nuevoProducto = {
        ...req.body,
        // Si el frontend no manda marca, le ponemos "ShadowSport Originals" por defecto
        brand: req.body.brand || "ShadowSport Originals" 
    };

    const resultado = await db.collection("products").insertOne(nuevoProducto);
    res.status(201).json({ mensaje: "Producto guardado con éxito", id: resultado.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Error al guardar el producto" });
  }
};

// Función para actualizar un producto (PUT)
// Función para actualizar un producto (PUT) - VERSIÓN TODOTERRENO
const actualizarProducto = async (req, res) => {
  try {
    const db = obtenerDB();
    const { ObjectId } = require('mongodb');
    const idProducto = req.params.id.trim();
    const datosActualizados = req.body;

    let filtroBusqueda;

    // Verificamos si el ID existe como texto normal (String)
    const existeComoString = await db.collection('products').findOne({ _id: idProducto });
    
    if (existeComoString) {
        filtroBusqueda = { _id: idProducto };
    } else if (ObjectId.isValid(idProducto)) {
        // Si no es texto, verificamos si es un ObjectId válido de MongoDB
        filtroBusqueda = { _id: new ObjectId(idProducto) };
    } else {
        return res.status(400).json({ error: "Formato de ID inválido" });
    }

    const resultado = await db.collection("products").updateOne(
      filtroBusqueda,
      { $set: datosActualizados }
    );

    if (resultado.matchedCount === 0) return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ mensaje: "Producto actualizado correctamente" });

  } catch (error) {
    console.error("🚨 Error en el backend al actualizar:", error);
    res.status(500).json({ error: "Error interno al actualizar el producto" });
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

const actualizarOferta = async (req, res) => {
    try {
        const db = obtenerDB();
        const { ObjectId } = require('mongodb');
        const idProducto = req.params.id.trim();
        const { onSale, salePrice } = req.body;

        console.log(`🔌 Conectado a la BD: "${db.databaseName}"`);

        let filtroBusqueda;

        // CAMBIO CRÍTICO AQUÍ: Usamos 'products' en inglés
        const existeComoString = await db.collection('products').findOne({ _id: idProducto });
        
        if (existeComoString) {
            filtroBusqueda = { _id: idProducto };
        } else if (ObjectId.isValid(idProducto)) {
            filtroBusqueda = { _id: new ObjectId(idProducto) };
        } else {
            return res.status(400).json({ error: "Formato de ID inválido" });
        }

        // CAMBIO CRÍTICO AQUÍ: Usamos 'products' y los nombres de variables en inglés
        const resultado = await db.collection('products').updateOne(
            filtroBusqueda,
            { 
                $set: { 
                    onSale: onSale === true || onSale === "true",
                    salePrice: parseFloat(salePrice)
                } 
            }
        );

        if (resultado.matchedCount >= 1) {
            res.json({ mensaje: "¡Oferta aplicada con éxito!" });
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }

    } catch (error) {
        console.error("🚨 ERROR CRÍTICO:", error);
        res.status(500).json({ error: "Error interno", detalle: error.message });
    }
};

// Recuerda exportarla al final del archivo: module.exports = { ..., actualizarOferta };

// Exportamos todas las funciones para poder usarlas en las rutas
module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  borrarProducto,
  actualizarOferta
};


