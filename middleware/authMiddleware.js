const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  // 1. Buscamos el token en la cabecera (Header) de la petición
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ error: "Acceso denegado. No presentaste un token." });
  }

  // 2. El formato estándar en la industria es "Bearer <token>", así que lo separamos
  const token = authHeader.split(' ')[1];

  try {
    // 3. Revisamos que el token sea auténtico y no haya caducado
    const decodificado = jwt.verify(token, process.env.JWT_SECRET || 'llave_secreta_temporal');
    
    // Si todo está bien, lo dejamos pasar a la ruta que quería acceder
    req.usuario = decodificado;
    next(); 
  } catch (error) {
    res.status(403).json({ error: "Token inválido o caducado." });
  }
};

module.exports = verificarToken;