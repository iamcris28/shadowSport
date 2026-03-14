require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importamos nuestra conexión a la BD y nuestras rutas
const { conectarDB } = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 3000;

// Middlewares (Configuraciones base)
app.use(cors());
app.use(express.json());

// Iniciamos la conexión a la base de datos PRIMERO, y luego prendemos el servidor
conectarDB().then(() => {
  
  // Le decimos a Express que todas las rutas de productos empiecen con '/api/products'
  app.use('/api/products', productRoutes);
  app.use('/api/auth', authRoutes);

  // Ruta base de prueba
  app.get('/', (req, res) => {
    res.send("¡La API de ShadowSport está funcionando con arquitectura profesional!");
  });

  // Encendemos el servidor
  app.listen(port, () => {
    console.log(`🔥 Servidor corriendo en http://localhost:${port}`);
  });

});