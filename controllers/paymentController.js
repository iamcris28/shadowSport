// Importamos Stripe y le pasamos nuestra llave secreta
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const crearSesionPago = async (req, res) => {
    try {
        const { carrito } = req.body;

        if (!carrito || carrito.length === 0) {
            return res.status(400).json({ error: "El carrito está vacío" });
        }

        // 1. Transformar el carrito de ShadowSport al formato que exige Stripe
        const lineItems = carrito.map(item => {
            return {
                price_data: {
                    currency: 'mxn', // Pon 'usd' si prefieres dólares
                    product_data: {
                        name: item.producto,
                        images: [item.imagen] // Stripe mostrará la foto del tenis en el checkout
                    },
                    unit_amount: Math.round(item.precio * 100), // Convertimos a centavos
                },
                quantity: item.cantidad,
            };
        });

        // 2. Crear la sesión de pago con Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            // URLs a las que Stripe redirigirá al cliente después de pagar (o cancelar)
            success_url: 'http://127.0.0.1:5500/exito.html', 
            cancel_url: 'http://127.0.0.1:5500/catalogo.html',
        });

        // 3. Devolverle la URL generada a tu frontend
        res.json({ url: session.url });

    } catch (error) {
        console.error("🚨 ERROR EN STRIPE:", error);
        res.status(500).json({ error: "Error al crear la sesión de pago" });
    }
};

module.exports = { crearSesionPago };