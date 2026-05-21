const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuración robusta y explícita para servidores en la nube (Render)
const transcoder = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Dirección exacta de Google
  port: 465,              // Puerto seguro SSL
  secure: true,           // Usar encriptación
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

// Función genérica para enviar correos electrónicos
const enviarCorreo = async (destinatario, asunto, cuerpoHtml) => {
  try {
    const opciones = {
      from: `"ShadowSport" <${process.env.EMAIL_USER}>`,
      to: destinatario,
      subject: asunto,
      html: cuerpoHtml
    };

    const info = await transcoder.sendMail(opciones);
    console.log(`📧 Correo enviado con éxito: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('🚨 Error en el servicio de correos:', error);
    return false;
  }
};

module.exports = { enviarCorreo };