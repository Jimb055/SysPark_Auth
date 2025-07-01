// Authentication controller / Controlador de autenticación
const { register, login } = require('../services/auth.service');

// Register endpoint / Endpoint para registrar usuario
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await register(email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login endpoint / Endpoint para iniciar sesión
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await login(email, password);
    res.json(data);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
