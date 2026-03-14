const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let dbConnection;

module.exports = {
  conectarDB: async () => {
    try {
      await client.connect();
      console.log("🚀 Conectado a MongoDB Atlas (Módulo Config)");
      dbConnection = client.db("ShadowSportDB");
    } catch (error) {
      console.error("❌ Error al conectar a la BD:", error);
      process.exit(1); // Detiene el servidor si la base de datos falla
    }
  },
  obtenerDB: () => dbConnection
};