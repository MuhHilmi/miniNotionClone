const bcrypt = require("bcryptjs");
const prisma = require("../lib/prisma");
const {
    generateToken,
    setAuthCookie,
    clearAuthCookie,
} = require("../utils/jwt");

async function register(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email dan password wajib diisi!" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password minimal 6 karakter" });
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return res.status(409).json({ message: "Email sudah terdaftar" })
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashed },
        });

        const token = generateToken({ id: user.id, email: user.email });
        setAuthCookie(res, token);

        return res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email dan Password wajib diisi" });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Email atau Password salah" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Email atau Password salah" });
        }

        const token = generateToken({ id: user.id, email: user.email });
        setAuthCookie(res, token);

        return res.json({ id: user.id, email: user.email });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
}

async function logout(req, res) {
    clearAuthCookie(res);
    return res.json({ message: "Berhasil logout!" });
}

async function me(req, res) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, email: true, createdAt: true },
        });
        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan!" });
        }
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
}

module.exports = { register, login, logout, me };
