// Import required modules / Importar los módulos necesarios
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables / Cargar variables de entorno
dotenv.config();

// Initialize the Express app / Inicializar la app de Express
const app = express();
const PORT = process.env.PORT || 3000;

// Apply middlewares / Aplicar middlewares
app.use(cors());
app.use(express.json());

// Test route / Ruta de prueba
app.get('/api/auth/ping', (req, res) => {
  res.json({ message: 'AuthService is running correctly 🚀' }); // El servicio está corriendo correctamente
});

// Import auth routes / Importar rutas de auth
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes); // Prefijo de rutas


// Start the server / Iniciar el servidor
app.listen(PORT, () => {
  console.log(`AuthService running at http://localhost:${PORT}`); // Servicio corriendo en el puerto indicado
});
