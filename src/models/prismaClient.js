// Prisma client setup / Configuración del cliente Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = prisma;
