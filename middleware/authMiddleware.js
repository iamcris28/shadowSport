const jwt = require('jsonwebtoken');

// 1. El guardia que revisa si el gafete (Token) es auténtico
const verificarToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ error: "Acceso denegado. No hay token." });

  const token = authHeader.split(' ')[1];

  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET || 'llave_secreta_temporal');
    req.usuario = decodificado; // ¡AQUÍ GUARDAMOS EL ROL PARA USARLO DESPUÉS!
    next(); 
  } catch (error) {
    res.status(403).json({ error: "Token inválido o caducado." });
  }
};

// 2. NUEVO: El guardia que lee la etiqueta del rol
const verificarRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    // Si el rol del usuario no está en la lista de permitidos, lo bloqueamos
    if (!req.usuario || !rolesPermitidos.includes(req.usuario.role)) {
      return res.status(403).json({ 
        error: `Acceso denegado. Se requiere nivel: ${rolesPermitidos.join(' o ')}` 
      });
    }
    next(); // Si su rol sí está permitido, lo deja pasar
  };
};

// Exportamos a los dos guardias
module.exports = { verificarToken, verificarRol };