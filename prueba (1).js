import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Flame, ShieldCheck, Zap, Star, Play, ChevronRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState, useEffect } from "react";


const categories = [
  {
    title: "Training",
    description: "Prendas de alto rendimiento para entrenamientos intensos.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Running",
    description: "Ligereza, ventilación y soporte para cada kilómetro.",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Recovery",
    description: "Comodidad premium para antes y después del esfuerzo.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
  },
];



const stats = [
  { value: "+250K", label: "Athletes equipados" },
  { value: "98%", label: "Satisfacción en rendimiento" },
  { value: "40+", label: "Países con envíos" },
  { value: "24/7", label: "Soporte especializado" },
];

const technologies = [
  {
    icon: Zap,
    title: "Dry-Tech",
    description: "Evacuación rápida del sudor para mantenerte seco por más tiempo.",
  },
  {
    icon: ShieldCheck,
    title: "Armor-Fit",
    description: "Compresión inteligente que brinda soporte sin limitar movilidad.",
  },
  {
    icon: Flame,
    title: "Heat-Control",
    description: "Materiales pensados para regular temperatura bajo alta exigencia.",
  },
];

const testimonials = [
  {
    name: "Daniel Cruz",
    role: "Cross Training Coach",
    quote:
      "La ropa se siente premium y resistente. Se nota que está pensada para entrenar de verdad.",
  },
  {
    name: "Valeria Soto",
    role: "Runner",
    quote:
      "El ajuste y la ligereza hacen diferencia. Ya es mi marca favorita para correr.",
  },
  {
    name: "Erick Molina",
    role: "Athlete",
    quote:
      "Visualmente es fuerte, pero lo mejor es el rendimiento. Cumple en sesiones intensas.",
  },
];

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-red-500">{eyebrow}</p>
      <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base text-zinc-400 sm:text-lg">{subtitle}</p>
    </div>
  );
}



    export default function ShadowSportLanding() {
  // 1. Creamos el estado para guardar los productos reales de tu base de datos
  const [productosBD, setProductosBD] = useState([]);

  // 2. Usamos useEffect para ir a buscar los datos a tu servidor al cargar la página
  useEffect(() => {
    const cargarInventario = async () => {
      try {
        // Hacemos la petición HTTP a tu backend (asegúrate de que tu servidor esté corriendo)
        const respuesta = await fetch('http://localhost:3000/api/products');
        
        if (!respuesta.ok) throw new Error("Error en la red");
        
        const datos = await respuesta.json();
        
        // Guardamos los datos de MongoDB en la memoria de la página
        setProductosBD(datos);
      } catch (error) {
        console.error("❌ Falló la conexión con el backend:", error);
      }
    };

    cargarInventario();
  }, []); // Los corchetes vacíos indican que esto solo se ejecuta 1 vez al entrar a la página

  return (
    // ... todo el diseño de la página empieza aquí ...

    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-black font-black">
              V
            </div>
            <div>
              <p className="text-lg font-black tracking-[0.2em]">SHADOW SPORT</p>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Elite Performance</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex text-sm text-zinc-300">
            <a href="#categorias" className="transition hover:text-white">Categorías</a>
            <a href="#tecnologia" className="transition hover:text-white">Tecnología</a>
            <a href="#coleccion" className="transition hover:text-white">Colección</a>
            <a href="#reviews" className="transition hover:text-white">Reviews</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="rounded-2xl text-white hover:bg-white/10 hover:text-white">Iniciar sesión</Button>
            <Button className="rounded-2xl bg-white text-black hover:bg-zinc-200">Comprar ahora</Button>
          </div>

          <button className="md:hidden rounded-xl border border-white/10 p-2 text-zinc-200">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.25),transparent_28%),radial-gradient(circle_at_left,rgba(255,255,255,0.08),transparent_20%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
              <Star className="h-4 w-4 text-red-500" />
              Nueva colección Spring / Summer 2026
            </div>

            <h1 className="mt-6 max-w-xl text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
              Built for
              <span className="block text-red-500">performance</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
              Ropa y calzado deportivo diseñados para atletas que exigen potencia, estilo y resistencia en cada movimiento.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button className="rounded-2xl bg-white px-6 text-black hover:bg-zinc-200">
                Explorar colección
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="rounded-2xl border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                <Play className="mr-2 h-4 w-4" />
                Ver campaña
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-2xl font-black">{stat.value}</p>
                  <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-red-500/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-2xl shadow-black/50">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1400&q=80"
                alt="Athlete training"
                className="h-[580px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-zinc-200">
                  Elite Training System
                </div>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-2xl font-black">Apex Series</p>
                    <p className="mt-2 max-w-md text-sm text-zinc-300">
                      Diseñada para fuerza, velocidad y control. Cada detalle está hecho para rendir bajo presión.
                    </p>
                  </div>
                  <button className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="categorias" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <SectionTitle
          eyebrow="Categorías"
          title="Diseño premium para cada tipo de atleta"
          subtitle="Una experiencia visual fuerte, moderna y pensada para vender productos deportivos con identidad sólida."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {categories.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden rounded-[2rem] border-white/10 bg-zinc-950">
                <CardContent className="p-0">
                  <div className="relative h-[380px] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-2xl font-black">{item.title}</p>
                      <p className="mt-2 max-w-sm text-sm text-zinc-300">{item.description}</p>
                      <button className="mt-5 inline-flex items-center text-sm font-semibold text-white">
                        Ver más <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="tecnologia" className="border-y border-white/10 bg-zinc-950/60">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <SectionTitle
              eyebrow="Tecnología"
              title="Materiales diseñados para superar límites"
              subtitle="La estructura de esta página está pensada para comunicar innovación, rendimiento y confianza de marca desde el primer scroll."
            />

            <div className="grid gap-4">
              {technologies.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={tech.title}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="rounded-[1.75rem] border border-white/10 bg-black/60 p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-2xl bg-white text-black p-3">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{tech.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-zinc-400">{tech.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="coleccion" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            eyebrow="Colección destacada"
            title="Productos listos para convertir"
            subtitle="Tarjetas de producto con estética premium para una tienda deportiva moderna."
          />
          <Button variant="outline" className="w-fit rounded-2xl border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            Ver catálogo completo
          </Button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={product._id} // Ahora usamos el ID real de MongoDB
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden rounded-[2rem] border-white/10 bg-zinc-950">
                <CardContent className="p-0">
                  <div className="relative h-[360px] overflow-hidden">
                    {/* Cambiamos product.image por product.image_url según tu base de datos */}
                    <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
                    <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-black">
                      {product.stock_status === 'in_stock' ? 'Disponible' : 'Poco Stock'}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-black">{product.name}</h3>
                        <p className="mt-2 text-sm text-zinc-400">{product.description}</p>
                      </div>
                      <span className="text-lg font-black text-white">${product.price}</span>
                    </div>
                    <Button className="mt-6 w-full rounded-2xl bg-white text-black hover:bg-zinc-200">
                      Añadir al carrito
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="reviews" className="border-t border-white/10 bg-zinc-950/50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <SectionTitle
            eyebrow="Reviews"
            title="Confianza construida con rendimiento real"
            subtitle="Los testimonios refuerzan la percepción de marca y ayudan a una landing profesional a vender mejor."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="rounded-[2rem] border border-white/10 bg-black/70 p-6"
              >
                <div className="flex gap-1 text-red-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-base leading-8 text-zinc-300">“{item.quote}”</p>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-zinc-500">{item.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white text-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.06),transparent_30%)]" />
          <div className="relative grid gap-10 px-8 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-14">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-zinc-500">Join the movement</p>
              <h3 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Entrena fuerte. Viste mejor. Vende con presencia.
              </h3>
              <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-700">
                Esta estructura te sirve como base para una marca deportiva profesional. Puedes convertirla en ecommerce, catálogo de productos o sitio corporativo.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-4 rounded-[2rem] bg-black p-6 text-white">
              <input
                placeholder="Ingresa tu correo"
                className="h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none placeholder:text-zinc-500"
              />
              <Button className="h-12 rounded-2xl bg-white text-black hover:bg-zinc-200">
                Recibir novedades
              </Button>
              <p className="text-xs text-zinc-500">
                Al registrarte aceptas recibir lanzamientos, promociones y noticias de rendimiento.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1fr_auto_auto_auto] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-black font-black">V</div>
              <div>
                <p className="text-lg font-black tracking-[0.2em]">SHADOW SPORT</p>
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Elite Performance</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-zinc-500">
              Marca deportiva conceptual con diseño moderno, agresivo y profesional inspirada en el universo del alto rendimiento.
            </p>
          </div>

          <div>
            <p className="font-bold">Empresa</p>
            <div className="mt-4 space-y-3 text-sm text-zinc-500">
              <p>Nosotros</p>
              <p>Tecnología</p>
              <p>Embajadores</p>
            </div>
          </div>

          <div>
            <p className="font-bold">Soporte</p>
            <div className="mt-4 space-y-3 text-sm text-zinc-500">
              <p>FAQ</p>
              <p>Envíos</p>
              <p>Devoluciones</p>
            </div>
          </div>

          <div>
            <p className="font-bold">Legal</p>
            <div className="mt-4 space-y-3 text-sm text-zinc-500">
              <p>Privacidad</p>
              <p>Términos</p>
              <p>Cookies</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
