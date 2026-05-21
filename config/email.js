const nodemailer = require('nodemailer');
require('dotenv').config();

// 🌟 SOLUCIÓN TÉCNICA: Obligamos a Node.js a priorizar IPv4 sobre IPv6
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

// Tu configuración segura
const transcoder = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
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