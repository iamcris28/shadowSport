const { Resend } = require('resend');
require('dotenv').config();

// Inicializamos Resend con tu llave secreta
const resend = new Resend(process.env.RESEND_API_KEY);

const enviarCorreo = async (destinatario, asunto, cuerpoHtml) => {
  try {
    const data = await resend.emails.send({
      // Resend te da este correo de prueba por defecto para que no tengas que comprar un dominio
      from: 'ShadowSport <onboarding@resend.dev>', 
      to: destinatario,
      subject: asunto,
      html: cuerpoHtml
    });

    console.log(`📧 Correo enviado con éxito vía Resend! ID: ${data.id}`);
    return true;
  } catch (error) {
    console.error('🚨 Error enviando con Resend:', error);
    return false;
  }
};

module.exports = { enviarCorreo };