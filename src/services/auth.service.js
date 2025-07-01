// Service logic for authentication / Lógica de servicio para autenticación
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../models/prismaClient');

const register = async (email, password) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: { email, 
            password: hashedPassword,
            role: 'USER',    
        },
  });

  return { id: newUser.id, email: newUser.email };
};

const login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign(
    {
        sub: user.id,         // estándar JWT
        email: user.email,
        role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
    );

  return { token, user: { id: user.id, email: user.email } };
};

module.exports = { register, login };
