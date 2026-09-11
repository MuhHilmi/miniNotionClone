const prisma = require("../lib/prisma");

// GET /api/notes - hanya note milik user yang login, urut dari terbaru
async function getAll(req, res) {
    try {
        const notes = await prisma.note.findMany({
            where: { userId: req.user.id },
            orderBy: { updatedAt: "desc" },
        });
        return res.json(notes);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
}

// GET /api/notes/:id - beserta blocks-nya, terurut order_index
async function getOne(req, res) {
    try {
        const id = Number(req.params.id);

        const note = await prisma.note.findFirst({
            where: { id, userId: req.user.id }, // wajib: pastikan note ini milik user yang login
            include: {
                blocks: {
                    orderBy: { orderIndex: "asc" },
                },
            },
        });

        if (!note) {
            return res.status(404).json({ message: "Note tidak ditemukan" });
        }

        return res.json(note);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
}

// POST /api/notes
async function create(req, res) {
    try {
        const { title } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ message: "Judul wajib diisi" });
        }

        const note = await prisma.note.create({
            data: {
                title: title.trim(),
                userId: req.user.id,
            },
        });

        return res.status(201).json({ ...note, blocks: [] });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
}

// PUT /api/notes/:id
async function update(req, res) {
    try {
        const id = Number(req.params.id);
        const { title } = req.body;

        // pastikan note ini milik user yang login sebelum update
        const existing = await prisma.note.findFirst({
            where: { id, userId: req.user.id },
        });
        if (!existing) {
            return res.status(404).json({ message: "Note tidak ditemukan" });
        }

        const note = await prisma.note.update({
            where: { id },
            data: { title: title?.trim() || existing.title },
        });

        return res.json(note);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
}

// DELETE /api/notes/:id
async function remove(req, res) {
    try {
        const id = Number(req.params.id);

        const existing = await prisma.note.findFirst({
            where: { id, userId: req.user.id },
        });
        if (!existing) {
            return res.status(404).json({ message: "Note tidak ditemukan" });
        }

        await prisma.note.delete({ where: { id } }); // blocks ikut terhapus (onDelete: Cascade)

        return res.json({ message: "Note berhasil dihapus" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
}

module.exports = { getAll, getOne, create, update, remove };
