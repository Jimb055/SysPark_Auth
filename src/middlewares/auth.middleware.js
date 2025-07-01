// JWT verification middleware / Middleware de verificación de JWT
const jwt = require('jsonwebtoken');

// Middleware to verify the token / Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Leer header Authorization
  const token = authHeader && authHeader.split(' ')[1]; // Formato esperado: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token missing.' }); // Acceso denegado. Falta el token
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar JWT
    req.user = decoded; // Adjuntar datos al request
    next(); // Continuar
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' }); // Token inválido
  }
};

module.exports = { verifyToken };
