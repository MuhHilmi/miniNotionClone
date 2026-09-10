const { PrismaClient } = require("@prisma/client");

// Hindari membuat banyak koneksi saat nodemon reload
const prisma = global.__prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.__prisma = prisma;

module.exports = prisma;
