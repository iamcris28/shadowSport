const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { obtenerDB } = require('../config/db');

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

module.exports = { registro, login };