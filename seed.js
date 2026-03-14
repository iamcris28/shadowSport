require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const productosAvanzados = [
  // 1. CALZADO (Tiene tallas numéricas y colores)
  { 
    name: "Velocity Run Shoes", 
    category: "Running", 
    price: 129, 
    stock_status: "in_stock", 
    description: "Ligereza y estabilidad para sesiones intensas.", 
    image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    attributes: {
        type: "Footwear",
        colors: ["Neon Green", "Stealth Black"],
        sizes_mx: [25, 26, 26.5, 27, 28, 28.5, 29]
    }
  },
  
  // 2. ROPA (Tiene tallas en letras y tipo de ajuste)
  { 
    name: "Apex Compression Tee", 
    category: "Training", 
    price: 59, 
    stock_status: "in_stock", 
    description: "Diseño atlético con enfoque en movilidad y soporte.", 
    image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    attributes: {
        type: "Apparel",
        fit: "Compression",
        sizes: ["S", "M", "L", "XL"],
        material: "80% Poliéster, 20% Elastano"
    }
  },

  // 3. EQUIPAMIENTO (No tiene tallas, tiene peso y material)
  { 
    name: "Kettlebell Pro 16kg", 
    category: "Training", 
    price: 85, 
    stock_status: "in_stock", 
    description: "Pesa rusa de hierro fundido con recubrimiento premium.", 
    image_url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    attributes: {
        type: "Equipment",
        weight_kg: 16,
        coating: "Neopreno anti-deslizante",
        colors: ["Rojo", "Negro"]
    }
  }
];

async function reestructurarBaseDeDatos() {
  try {
    await client.connect();
    console.log("🚀 Conectado a MongoDB Atlas...");
    
    const db = client.db("ShadowSportDB");
    const coleccionProductos = db.collection("products");

    // 1. Borramos el inventario viejo y plano para no mezclar estructuras
    await coleccionProductos.deleteMany({});
    console.log("🧹 Inventario anterior limpiado.");
    
    // 2. Insertamos la nueva estructura avanzada
    const resultado = await coleccionProductos.insertMany(productosAvanzados);
    console.log(`✅ ¡Éxito! ${resultado.insertedCount} productos con esquema dinámico insertados.`);
    
  } catch (error) {
    console.error("❌ Error al reestructurar:", error);
  } finally {
    await client.close();
  }
}

reestructurarBaseDeDatos();