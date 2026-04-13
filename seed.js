require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const productosAvanzados = [
  // --- CALZADO ---
  { 
    name: "Velocity Run Shoes", category: "Running", price: 129, stock_status: "in_stock", description: "Ligereza y estabilidad para sesiones intensas.", image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    attributes: { type: "Footwear", colors: ["Neon Green", "Stealth Black"], sizes_mx: [25, 26, 26.5, 27, 28, 29] }
  },
  { 
    name: "Titan Lifter Pro", category: "Training", price: 149, stock_status: "low_stock", description: "Base plana y rígida para levantamiento de pesas pesado.", image_url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    attributes: { type: "Footwear", colors: ["White/Red", "All Black"], sizes_mx: [26, 27, 28, 28.5, 30] }
  },
  { 
    name: "Cloud Recovery Slides", category: "Recovery", price: 45, stock_status: "in_stock", description: "Espuma viscoelástica para descansar los pies post-entrenamiento.", image_url: "https://images.unsplash.com/photo-1565515269720-74512e0ec3d2?auto=format&fit=crop&w=800&q=80",
    attributes: { type: "Footwear", colors: ["Grey", "Navy"], sizes_mx: [24, 25, 26, 27, 28] }
  },

  // --- ROPA ---
  { 
    name: "Apex Compression Tee", category: "Training", price: 59, stock_status: "in_stock", description: "Diseño atlético con enfoque en movilidad y soporte.", image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    attributes: { type: "Apparel", fit: "Compression", sizes: ["S", "M", "L", "XL"], material: "Poliéster/Elastano" }
  },
  { 
    name: "Aero Sprint Jacket", category: "Running", price: 89, stock_status: "in_stock", description: "Chamarra rompevientos ultra ligera con detalles reflectantes.", image_url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    attributes: { type: "Apparel", fit: "Regular", sizes: ["M", "L", "XL"], material: "Nylon Impermeable" }
  },
  { 
    name: "Core Flex Hoodie", category: "Recovery", price: 75, stock_status: "low_stock", description: "Sudadera premium de algodón orgánico para el día a día.", image_url: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=800&q=80",
    attributes: { type: "Apparel", fit: "Loose", sizes: ["S", "M", "L", "XXL"], material: "Algodón 100%" }
  },
  { 
    name: "Marathon Elite Tights", category: "Running", price: 65, stock_status: "in_stock", description: "Mallas con bolsillos laterales para geles de hidratación.", image_url: "https://images.unsplash.com/photo-1533681904393-9ab6efa9e466?auto=format&fit=crop&w=800&q=80",
    attributes: { type: "Apparel", fit: "Tight", sizes: ["XS", "S", "M", "L"], material: "Lycra Sport" }
  },

  // --- EQUIPAMIENTO ---
  { 
    name: "Kettlebell Pro 16kg", category: "Training", price: 85, stock_status: "in_stock", description: "Pesa rusa de hierro fundido con recubrimiento premium.", image_url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    attributes: { type: "Equipment", weight_kg: 16, coating: "Neopreno anti-deslizante", colors: ["Rojo"] }
  },
  { 
    name: "Kettlebell Pro 24kg", category: "Training", price: 110, stock_status: "in_stock", description: "Pesa rusa para entrenamiento de potencia avanzado.", image_url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    attributes: { type: "Equipment", weight_kg: 24, coating: "Neopreno anti-deslizante", colors: ["Negro"] }
  },
  { 
    name: "Aura Yoga Mat", category: "Recovery", price: 40, stock_status: "in_stock", description: "Tapete antideslizante con líneas guía para posturas.", image_url: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80",
    attributes: { type: "Equipment", thickness_mm: 5, material: "Eco-PVC", colors: ["Morado", "Azul"] }
  },
  { 
    name: "Pro Resistance Bands", category: "Training", price: 25, stock_status: "out_of_stock", description: "Set de 5 bandas de látex con distintos niveles de tensión.", image_url: "https://images.unsplash.com/photo-1598266663412-7bf42cb50f44?auto=format&fit=crop&w=800&q=80",
    attributes: { type: "Equipment", resistance_levels: 5, material: "Látex natural" }
  },

  // --- ACCESORIOS (Nueva estructura) ---
  { 
    name: "Hydra Pack Vest", category: "Running", price: 80, stock_status: "in_stock", description: "Chaleco de hidratación para largas distancias. Incluye 2 botellas.", image_url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    attributes: { type: "Accessory", capacity_liters: 1.5, waterproof: true }
  },
  { 
    name: "Phantom Running Cap", category: "Running", price: 22, stock_status: "in_stock", description: "Gorra transpirable y ultra ligera para el sol.", image_url: "https://images.unsplash.com/photo-1556306535-0f09a536f0bl?auto=format&fit=crop&w=800&q=80",
    attributes: { type: "Accessory", fit: "Adjustable", uv_protection: true }
  },
  { 
    name: "Iron Grip Gloves", category: "Training", price: 30, stock_status: "in_stock", description: "Guantes con soporte de muñeca para evitar lesiones.", image_url: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
    attributes: { type: "Accessory", sizes: ["S", "M", "L"], wrist_wrap: true }
  },
  { 
    name: "Therma-Massage Gun", category: "Recovery", price: 150, stock_status: "in_stock", description: "Pistola de masaje muscular con 4 cabezales intercambiables.", image_url: "https://images.unsplash.com/photo-1584735174965-48c48d7028a9?auto=format&fit=crop&w=800&q=80",
    attributes: { type: "Accessory", battery_life_hours: 4, speeds: 6 }
  }
];

async function reestructurarBaseDeDatos() {
  try {
    await client.connect();
    console.log("🚀 Conectado a MongoDB Atlas...");
    const coleccionProductos = client.db("ShadowSportDB").collection("products");

    await coleccionProductos.deleteMany({});
    console.log("🧹 Inventario anterior limpiado.");
    
    const resultado = await coleccionProductos.insertMany(productosAvanzados);
    console.log(`✅ ¡Éxito! ${resultado.insertedCount} productos insertados listos para el diagrama.`);
    
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await client.close();
  }
}

reestructurarBaseDeDatos();