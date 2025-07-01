// Middleware to restrict access by role / Middleware para restringir acceso por rol
const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user; // Ya cargado por verifyToken

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({
        error: 'Access denied. You do not have permission for this action.', // Acceso denegado
      });
    }

    next(); // El usuario tiene rol permitido
  };
};

module.exports = { authorizeRole };
