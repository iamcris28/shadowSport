// ==========================================
// seed.js - SCRIPT AUTOMATIZADO DE CATÁLOGO
// ==========================================
const { conectarDB, obtenerDB } = require('./config/db');

const productosNuevos = [
  {
    name: "Nike Air Zoom Pegasus 40",
    gender: "Unisex",
    section: "Calzado",
    category: "Running",
    price: 149.99,
    description: "Amortiguación elástica para cada carrera. La sensación familiar y personalizada de las Pegasus regresa para ayudarte a alcanzar tus objetivos con un soporte neutro y una transición suave.",
    image_url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=80",
    is_offer: false,
    brand: "Nike"
  },
  {
    name: "Adidas Ultraboost Light Carbon",
    gender: "Hombre",
    section: "Calzado",
    category: "Running",
    price: 189.50,
    description: "Experimenta una energía épica con las Ultraboost más ligeras de la historia. Diseñadas con una cápsula molecular BOOST que proporciona un retorno de energía supremo.",
    image_url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80",
    is_offer: false,
    brand: "Adidas"
  },
  {
    name: "Puma Mirage Sport Remix Casual",
    gender: "Unisex",
    section: "Calzado",
    category: "Lifestyle",
    price: 110.00,
    description: "Una fusión de cultura de archivo y diseño futurista. Inspiradas en la cultura DJ, estas zapatillas combinan capas de malla, líneas premium y texturas dinámicas.",
    image_url: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&auto=format&fit=crop&q=80",
    is_offer: true,
    brand: "Puma"
  },
  {
    name: "Nike Air Jordan 1 Retro High OG",
    gender: "Hombre",
    section: "Calzado",
    category: "Basketball",
    price: 175.00,
    description: "El clásico absoluto que revolucionó las canchas y la cultura urbana. Confeccionadas con cuero de primera calidad y la icónica unidad Air-Sole encapsulada.",
    image_url: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80",
    is_offer: false,
    brand: "Nike"
  },
  {
    name: "Puma Fuse 2.0 Performance Training",
    gender: "Mujer",
    section: "Calzado",
    category: "Training",
    price: 95.00,
    description: "Rediseñadas para mejorar el rendimiento en entrenamientos de fuerza. Incorporan una suela de goma PUMAGRIP para tracción multidireccional.",
    image_url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
    is_offer: false,
    brand: "Puma"
  },
  {
    name: "Adidas Forum Low Classic",
    gender: "Unisex",
    section: "Calzado",
    category: "Lifestyle",
    price: 100.00,
    description: "Nacidas en las canchas de baloncesto de los 80 y adoptadas por la cultura urbana. Esta versión mantiene la emblemática correa ajustable en el tobillo y el diseño de cuero premium.",
    image_url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80",
    is_offer: false,
    brand: "Adidas"
  }
];

async function iniciarInyeccion() {
  try {
    console.log("🔌 Conectando con MongoDB Atlas...");
    await conectarDB();
    const db = obtenerDB();
    
    console.log("📦 Insertando productos comerciales en la colección...");
    const resultado = await db.collection('products').insertMany(productosNuevos);
    
    console.log(`✅ ¡Éxito! Se agregaron ${resultado.insertedCount} productos profesionales al catálogo.`);
    process.exit(0);
  } catch (error) {
    console.error("🚨 Error al poblar el catálogo:", error);
    process.exit(1);
  }
}

iniciarInyeccion();