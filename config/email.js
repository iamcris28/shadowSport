// config/email.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuración del transporte utilizando Gmail como ejemplo
const transcoder = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Tu correo electrónico (ej. shadow@gmail.com)
    pass: process.env.EMAIL_PASS  // Tu contraseña de aplicación generada en Google
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