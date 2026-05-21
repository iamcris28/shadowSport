// config/email.js

// Pega aquí la URL larguísima que te dio Google Apps Script
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwgfLw_dHqWCAFLE6CFY4usaqXOBEOh6hM_N_SPZCzwrq6fdZGj4Df-ybooSx-5Y0xnWA/exec";

const enviarCorreo = async (destinatario, asunto, cuerpoHtml) => {
  try {
    const respuesta = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      // No mandamos headers de JSON porque a veces Google Script se confunde con los CORS
      body: JSON.stringify({
        to: destinatario,
        subject: asunto,
        html: cuerpoHtml
      })
    });

    const data = await respuesta.json();

    if (data.status === 'success') {
      console.log(`📧 Correo enviado con éxito por Google Script a: ${destinatario}`);
      return true;
    } else {
      console.error('🚨 Error de Google Script:', data.message);
      return false;
    }
  } catch (error) {
    console.error('🚨 Error de conexión con tu API de Google:', error);
    return false;
  }
};

module.exports = { enviarCorreo };