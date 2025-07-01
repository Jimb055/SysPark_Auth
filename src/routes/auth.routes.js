const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Necesario para el POST /validate-token
const { registerUser, loginUser } = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');

// Register and Login
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route / Ruta protegida
router.get('/profile', verifyToken, (req, res) => {
  res.json({
    message: 'Access granted to protected route 🔐',
    user: req.user,
  });
});

// Admin-only route / Ruta solo para ADMIN
router.get('/admin-area', verifyToken, authorizeRole('ADMIN'), (req, res) => {
  res.json({
    message: 'Welcome to the admin area 👑',
    user: req.user,
  });
});

// Token validation via headers (Authorization: Bearer ...) / Validación por headers
router.get('/validate-token', verifyToken, (req, res) => {
  res.status(200).json({
    valid: true,
    user: req.user,
  });
});

// Token validation via POST body / Validación por body (útil en frontend)
router.post('/validate-token', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required in body' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({
      valid: true,
      user: decoded,
    });
  } catch (err) {
    return res.status(401).json({
      valid: false,
      error: 'Invalid token',
    });
  }
});

module.exports = router;
