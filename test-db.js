require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// Obtenemos la URI desde el archivo .env
const uri = process.env.MONGO_URI;

// Configuramos el cliente de MongoDB
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Intentamos conectar
    await client.connect();
    
    // Enviamos un "ping" para confirmar que la conexión es exitosa
    await client.db("admin").command({ ping: 1 });
    
    console.log("🚀 ¡Éxito! Te has conectado correctamente a la base de datos de ShadowSport en MongoDB Atlas.");
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error);
  } finally {
    // Cerramos la conexión para que el script termine
    await client.close();
  }
}

run().catch(console.dir);