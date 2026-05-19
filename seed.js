// ==========================================
// seed.js - 30 PRODUCTOS ÚNICOS (CERO REPETICIONES, CERO LINKS ROTOS)
// ==========================================
const { conectarDB, obtenerDB } = require('./config/db');

const catalogoPerfecto = [
  // ================= 👟 CALZADO (10 ÚNICOS) =================
  { 
    name: "Nike Air Max 270", gender: "Mujer", section: "Calzado", category: "Lifestyle", price: 150.00, 
    description: "La unidad Max Air más grande hasta la fecha para una pisada supersuave.", is_offer: false, brand: "Nike",
    image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" // Nike Rojo
  },
  { 
    name: "Nike Air Jordan 1", gender: "Hombre", section: "Calzado", category: "Basketball", price: 175.00, 
    description: "El clásico absoluto que revolucionó las canchas y la cultura urbana.", is_offer: false, brand: "Nike",
    image_url: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80" // Jordan 1
  },
  { 
    name: "Nike Blazer Mid 77", gender: "Unisex", section: "Calzado", category: "Lifestyle", price: 105.00, 
    description: "Estilo vintage de los años 70 que combina con todo.", is_offer: true, brand: "Nike",
    image_url: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80" // Tenis azul
  },
  { 
    name: "Adidas Ultraboost Light", gender: "Mujer", section: "Calzado", category: "Running", price: 189.50, 
    description: "Energía épica con la entresuela BOOST más ligera de la historia.", is_offer: false, brand: "Adidas",
    image_url: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&q=80" // Adidas NMD
  },
  { 
    name: "Adidas Forum Low", gender: "Hombre", section: "Calzado", category: "Lifestyle", price: 100.00, 
    description: "Nacidas en las canchas de los 80, adoptadas por las calles.", is_offer: false, brand: "Adidas",
    image_url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80" // Tenis amarillo/skate
  },
  { 
    name: "Puma RS-X3 Puzzle", gender: "Mujer", section: "Calzado", category: "Lifestyle", price: 110.00, 
    description: "Diseño voluminoso retro-futurista con colores vibrantes.", is_offer: false, brand: "Puma",
    image_url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80" // Puma Blanco
  },
  { 
    name: "Puma Velocity Nitro", gender: "Hombre", section: "Calzado", category: "Running", price: 119.00, 
    description: "Amortiguación inteligente de nitrógeno inyectado.", is_offer: false, brand: "Puma",
    image_url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80" // Tenis negro running
  },
  { 
    name: "ShadowSport Alpha Lifter", gender: "Unisex", section: "Calzado", category: "Training", price: 110.00, 
    description: "Talón elevado de TPU para sentadillas perfectas.", is_offer: true, brand: "ShadowSport Originals",
    image_url: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80" // Sneaker deportivo oscuro
  },
  { 
    name: "ShadowSport Aero Sprint", gender: "Unisex", section: "Calzado", category: "Running", price: 115.00, 
    description: "Malla aerodinámica ultraligera para velocistas.", is_offer: false, brand: "ShadowSport Originals",
    image_url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80" // Tenis moderno grueso
  },
  { 
    name: "Adidas Yeezy Boost", gender: "Unisex", section: "Calzado", category: "Lifestyle", price: 220.00, 
    description: "Silueta icónica con tecnología de confort superior.", is_offer: false, brand: "Adidas",
    image_url: "https://images.unsplash.com/photo-1502809737437-1d85c70dd2ca?w=800&q=80" // Yeezy style
  },

  // ================= 👕 ROPA (10 ÚNICOS) =================
  { 
    name: "Nike Sportswear Club Fleece", gender: "Unisex", section: "Ropa", category: "Lifestyle", price: 55.00, 
    description: "Sudadera con gorro clásica y cómoda, un básico para el día a día.", is_offer: false, brand: "Nike",
    image_url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80" // Sudadera gris
  },
  { 
    name: "Nike Dri-FIT Miler Tee", gender: "Hombre", section: "Ropa", category: "Running", price: 35.00, 
    description: "Camiseta de running absorbente de sudor con protección UV.", is_offer: false, brand: "Nike",
    image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80" // Playera blanca
  },
  { 
    name: "Nike Pro 365 Leggings", gender: "Mujer", section: "Ropa", category: "Training", price: 50.00, 
    description: "Mallas ajustadas con paneles de malla en las pantorrillas para ventilación.", is_offer: false, brand: "Nike",
    image_url: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80" // Leggings mujer
  },
  { 
    name: "Adidas Tiro 23 League Pants", gender: "Hombre", section: "Ropa", category: "Training", price: 50.00, 
    description: "Pantalones de entrenamiento cónicos con tecnología AEROREADY.", is_offer: true, brand: "Adidas",
    image_url: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&q=80" // Pants deportivos
  },
  { 
    name: "Adidas Essentials Tank", gender: "Mujer", section: "Ropa", category: "Lifestyle", price: 25.00, 
    description: "Tirantes clásicos de algodón suave con las icónicas tres franjas.", is_offer: false, brand: "Adidas",
    image_url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80" // Mujer fitness tank
  },
  { 
    name: "Puma Evostripe Jacket", gender: "Hombre", section: "Ropa", category: "Lifestyle", price: 65.00, 
    description: "Chamarra ligera con corte ergonómico para mayor libertad de movimiento.", is_offer: false, brand: "Puma",
    image_url: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=800&q=80" // Chamarra rompevientos
  },
  { 
    name: "Puma High Impact Bra", gender: "Mujer", section: "Ropa", category: "Training", price: 45.00, 
    description: "Sujetador deportivo de alto impacto para máximo soporte.", is_offer: false, brand: "Puma",
    image_url: "https://images.unsplash.com/photo-1620794341491-bafebdf209f6?w=800&q=80" // Sports bra
  },
  { 
    name: "ShadowSport Compression Pro", gender: "Hombre", section: "Ropa", category: "Cross-Training", price: 40.00, 
    description: "Mantiene el calor muscular durante el levantamiento de pesas.", is_offer: false, brand: "ShadowSport Originals",
    image_url: "https://images.unsplash.com/photo-1616847201103-75e921dcd53e?w=800&q=80" // Atleta compresión
  },
  { 
    name: "ShadowSport Thermal Zip-Up", gender: "Unisex", section: "Ropa", category: "Recovery", price: 55.00, 
    description: "Chaqueta térmica afelpada por dentro, perfecta para el descanso.", is_offer: false, brand: "ShadowSport Originals",
    image_url: "https://images.unsplash.com/photo-1512413914619-338271708892?w=800&q=80" // Sudadera invierno
  },
  { 
    name: "Adidas Basketball Shorts", gender: "Hombre", section: "Ropa", category: "Basketball", price: 40.00, 
    description: "Shorts de básquet holgados de malla transpirable para dominar la cancha.", is_offer: false, brand: "Adidas",
    image_url: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80" // Shorts basquet
  },

  // ================= 🎒 ACCESORIOS (10 ÚNICOS) =================
  { 
    name: "Nike Brasilia Duffel Bag", gender: "Unisex", section: "Accesorios", category: "Training", price: 40.00, 
    description: "Bolsa de deporte resistente con compartimento separado para calzado.", is_offer: false, brand: "Nike",
    image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80" // Maleta negra
  },
  { 
    name: "Adidas Steel Metal Bottle", gender: "Unisex", section: "Accesorios", category: "Training", price: 30.00, 
    description: "Capacidad de 1 Litro. Acero inoxidable libre de BPA.", is_offer: false, brand: "Adidas",
    image_url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80" // Botella de agua
  },
  { 
    name: "ShadowSport Hex Dumbbells", gender: "Unisex", section: "Accesorios", category: "Training", price: 45.00, 
    description: "Pesas hexagonales recubiertas de neopreno para un agarre seguro.", is_offer: false, brand: "ShadowSport Originals",
    image_url: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80" // Pesas
  },
  { 
    name: "Adidas Yoga Mat Premium", gender: "Unisex", section: "Accesorios", category: "Recovery", price: 45.00, 
    description: "Colchoneta de 8mm de grosor con textura antideslizante para estiramientos.", is_offer: false, brand: "Adidas",
    image_url: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80" // Tapete yoga
  },
  { 
    name: "Nike Everyday Cushion Socks", gender: "Unisex", section: "Accesorios", category: "Training", price: 18.00, 
    description: "Paquete de 3 pares. Amortiguación en zonas de alto impacto.", is_offer: true, brand: "Nike",
    image_url: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&q=80" // Calcetines
  },
  { 
    name: "Puma Running Cap", gender: "Unisex", section: "Accesorios", category: "Running", price: 18.00, 
    description: "Gorra superligera con detalles reflectantes para alta visibilidad.", is_offer: false, brand: "Puma",
    image_url: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80" // Gorra
  },
  { 
    name: "ShadowSport Pro Jump Rope", gender: "Unisex", section: "Accesorios", category: "Training", price: 15.00, 
    description: "Cuerda para saltar de velocidad con rodamientos de acero inoxidable.", is_offer: false, brand: "ShadowSport Originals",
    image_url: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80" // Cuerda saltar
  },
  { 
    name: "Nike Basketball Elite Pro", gender: "Unisex", section: "Accesorios", category: "Basketball", price: 40.00, 
    description: "Balón oficial con textura profunda para un control superior.", is_offer: false, brand: "Nike",
    image_url: "https://images.unsplash.com/photo-1515523110800-9418428986ea?w=800&q=80" // Balon basquetbol
  },
  { 
    name: "Adidas Training Gloves", gender: "Unisex", section: "Accesorios", category: "Cross-Training", price: 20.00, 
    description: "Guantes de gimnasio con palma acolchada.", is_offer: false, brand: "Adidas",
    image_url: "https://images.unsplash.com/photo-1583416750470-965b2707b355?w=800&q=80" // Guantes gym
  },
  { 
    name: "ShadowSport Smart Tracker", gender: "Unisex", section: "Accesorios", category: "Running", price: 95.00, 
    description: "Monitor de ritmo cardíaco y contador de pasos sincronizable con app.", is_offer: false, brand: "ShadowSport Originals",
    image_url: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b0?w=800&q=80" // Smartwatch
  }
];

async function iniciarInyeccion() {
  try {
    console.log("🔌 Conectando con MongoDB Atlas...");
    await conectarDB();
    const db = obtenerDB();
    
    console.log("🧹 LIMPIANDO BASE DE DATOS (Borrando todos los links rotos y repetidos)...");
    await db.collection('products').deleteMany({}); 
    
    console.log("📦 Inyectando catálogo final de 30 productos con FOTOS 100% ÚNICAS...");
    const resultado = await db.collection('products').insertMany(catalogoPerfecto);
    
    console.log(`\n✅ ¡ÉXITO! Base de datos reiniciada con ${resultado.insertedCount} productos impecables.`);
    process.exit(0);
  } catch (error) {
    console.error("🚨 Error crítico al poblar el catálogo:", error);
    process.exit(1);
  }
}

iniciarInyeccion();