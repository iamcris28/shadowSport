const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { obtenerDB } = require('../config/db');

// Función para registrar un nuevo Administrador
const registrarAdmin = async (req, res) => {
  try {
    const db = obtenerDB();
    const { email, password } = req.body;

    // 1. Verificamos si el usuario ya existe
    const usuarioExistente = await db.collection("users").findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: "Este correo ya está registrado" });
    }

    // 2. Encriptamos la contraseña (le damos 10 vueltas de seguridad)
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptada = await bcrypt.hash(password, salt);

    // 3. Guardamos al administrador en la base de datos
    const nuevoUsuario = {
      email,
      password: passwordEncriptada,
      role: 'admin' // Etiqueta clave para la Intranet
    };

    await db.collection("users").insertOne(nuevoUsuario);
    res.status(201).json({ mensaje: "Administrador registrado con éxito" });

  } catch (error) {
    res.status(500).json({ error: "Error al registrar el administrador" });
  }
};

// Función para Iniciar Sesión (Login)
const loginAdmin = async (req, res) => {
  try {
    const db = obtenerDB();
    const { email, password } = req.body;

    // 1. Buscamos al usuario por su correo
    const usuario = await db.collection("users").findOne({ email });
    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // 2. Comparamos la contraseña que escribió con la encriptada en la BD
    const passwordCorrecta = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecta) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // 3. ¡Si todo está bien, generamos el Token (gafete)!
    // Nota: Usamos una llave secreta que luego pondremos en tu .env
    const token = jwt.sign(
      { id: usuario._id, role: usuario.role }, 
      process.env.JWT_SECRET || 'llave_secreta_temporal', 
      { expiresIn: '2h' } // El token caduca en 2 horas por seguridad
    );

    res.json({ mensaje: "Login exitoso", token });

  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

module.exports = {
  registrarAdmin,
  loginAdmin
};