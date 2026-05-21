const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // <-- NUEVO: Para generar los tokens seguros de recuperación
const { obtenerDB } = require('../config/db');
const { enviarCorreo } = require('../config/email'); // <-- NUEVO: El servicio que configuramos

// 1. REGISTRO DE USUARIOS (Con asignación de Roles)
const registro = async (req, res) => {
  try {
    // Ahora también recibimos el "role" desde el frontend/Thunder Client
    const { email, password, role } = req.body; 
    const db = obtenerDB();

    // Verificamos si el correo ya existe
    const usuarioExistente = await db.collection('users').findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Encriptamos la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptada = await bcrypt.hash(password, salt);

    // MAGIA DE ROLES: Si no nos mandan un rol, por defecto será "cliente"
    // Los roles válidos serán: 'admin', 'proveedor', 'cliente'
    const rolAsignado = role || 'cliente';

    const nuevoUsuario = {
      email,
      password: passwordEncriptada,
      role: rolAsignado // Guardamos el rol en la base de datos
    };

    await db.collection('users').insertOne(nuevoUsuario);
    res.status(201).json({ mensaje: `Usuario registrado con éxito como ${rolAsignado}` });

  } catch (error) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

// 2. LOGIN (Entregando el Gafete con el Rol adentro)
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = obtenerDB();

    const usuario = await db.collection('users').findOne({ email });
    if (!usuario) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    const passwordCorrecta = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecta) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    // MAGIA DEL TOKEN: Guardamos el ID y el ROL dentro del JWT
    const token = jwt.sign(
      { id: usuario._id, role: usuario.role }, // <-- Aquí va el rol
      process.env.JWT_SECRET || 'llave_secreta_temporal',
      { expiresIn: '2h' }
    );

    // Le devolvemos el token y el rol al frontend para que Lisset sepa qué pantalla mostrarle
    res.json({ 
      mensaje: "Login exitoso", 
      token,
      role: usuario.role 
    });

  } catch (error) {
    res.status(500).json({ error: "Error en el login" });
  }
};

// 3. SOLICITAR RECUPERACIÓN (NUEVO)
const solicitarRecuperacion = async (req, res) => {
  try {
    const db = obtenerDB();
    const { email } = req.body;

    const usuario = await db.collection('users').findOne({ email });
    if (!usuario) {
      // Por seguridad, damos un mensaje genérico para evitar escaneo de correos
      return res.json({ OK: true, mensaje: "Si el correo está registrado, recibirás un enlace de recuperación." });
    }

    // Generamos un token aleatorio seguro y una fecha de expiración (1 hora)
    const tokenRecuperacion = crypto.randomBytes(20).toString('hex');
    const expiracionToken = Date.now() + 3600000;

    // Guardamos estos datos temporales en el documento del usuario
    await db.collection('users').updateOne(
      { _id: usuario._id },
      { $set: { resetPasswordToken: tokenRecuperacion, resetPasswordExpires: expiracionToken } }
    );

    // Enlace apuntando al frontend
    const enlaceRestablecer = `https://shadowsport1.netlify.app/reset-password.html?token=${tokenRecuperacion}`;

    const asunto = "Recuperación de contraseña - ShadowSport";
    const cuerpoHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
        <h2 style="color: #000; text-align: center;">Restablecer tu Contraseña</h2>
        <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta en ShadowSport.</p>
        <p>Para continuar, haz clic en el siguiente enlace de un solo uso (expira en 1 hora):</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${enlaceRestablecer}" style="background-color: #000; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold;">Restablecer Contraseña</a>
        </div>
        <p style="font-size: 12px; color: #999;">Si no solicitaste este cambio, puedes ignorar este correo de forma segura.</p>
      </div>
    `;

    await enviarCorreo(usuario.email, asunto, cuerpoHtml);
    res.json({ OK: true, mensaje: "Enlace de recuperación enviado." });
  } catch (error) {
    console.error("Error en solicitud de recuperación:", error);
    res.status(500).json({ error: "Error en la solicitud de recuperación" });
  }
};

// 4. RESTABLECER CONTRASEÑA CON TOKEN (NUEVO)
const restablecerPassword = async (req, res) => {
  try {
    const db = obtenerDB();
    const { token, nuevaPassword } = req.body;

    // Buscamos un usuario que tenga ese token y que no haya expirado
    const usuario = await db.collection('users').findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!usuario) {
      return res.status(400).json({ error: "El enlace de recuperación es inválido o ha expirado." });
    }

    // Encriptamos la nueva contraseña (usando bcryptjs como en tu registro)
    const salt = await bcrypt.genSalt(10);
    const nuevaPasswordHash = await bcrypt.hash(nuevaPassword, salt);

    // Actualizamos la contraseña y limpiamos los campos temporales
    await db.collection('users').updateOne(
      { _id: usuario._id },
      { 
        $set: { password: nuevaPasswordHash }, // Mantenemos el nombre de campo "password" que usaste en registro
        $unset: { resetPasswordToken: "", resetPasswordExpires: "" } 
      }
    );

    res.json({ OK: true, mensaje: "Contraseña actualizada correctamente. Ya puedes iniciar sesión." });
  } catch (error) {
    console.error("Error al restablecer contraseña:", error);
    res.status(500).json({ error: "Error al restablecer la contraseña" });
  }
};

// Exportamos todas las funciones para que authRoutes.js las pueda usar
module.exports = { registro, login, solicitarRecuperacion, restablecerPassword };