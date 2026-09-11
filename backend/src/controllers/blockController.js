const prisma = require("../lib/prisma");

// Helper: pastikan note ini milik user yang login, dipakai di semua endpoint block
async function assertNoteOwnership(noteId, userId) {
    const note = await prisma.note.findFirst({
        where: { id: noteId, userId },
    });
    return note;
}

// POST /api/blocks
async function create(req, res) {
    try {
        const { noteId, type, content, orderIndex, parentId } = req.body;

        if (!noteId || !type) {
            return res.status(400).json({ message: "noteId dan type wajib diisi" });
        }

        const note = await assertNoteOwnership(Number(noteId), req.user.id);
        if (!note) {
            return res.status(404).json({ message: "Note tidak ditemukan" });
        }

        const block = await prisma.block.create({
            data: {
                noteId: Number(noteId),
                type,
                content: content || "",
                orderIndex: orderIndex ?? 0,
                parentId: parentId ? Number(parentId) : null,
            },
        });

        // touch updatedAt di note induk, berguna untuk urutan "terakhir diedit"
        await prisma.note.update({
            where: { id: Number(noteId) },
            data: { updatedAt: new Date() },
        });

        return res.status(201).json(block);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
}

// PUT /api/blocks/:id
async function update(req, res) {
    try {
        const id = Number(req.params.id);
        const { content, isChecked } = req.body;

        const block = await prisma.block.findUnique({
            where: { id },
            include: { note: true },
        });

        if (!block || block.note.userId !== req.user.id) {
            return res.status(404).json({ message: "Block tidak ditemukan" });
        }

        const updated = await prisma.block.update({
            where: { id },
            data: {
                ...(content !== undefined && { content }),
                ...(isChecked !== undefined && { isChecked }),
            },
        });

        await prisma.note.update({
            where: { id: block.noteId },
            data: { updatedAt: new Date() },
        });

        return res.json(updated);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
}

// DELETE /api/blocks/:id
async function remove(req, res) {
    try {
        const id = Number(req.params.id);

        const block = await prisma.block.findUnique({
            where: { id },
            include: { note: true },
        });

        if (!block || block.note.userId !== req.user.id) {
            return res.status(404).json({ message: "Block tidak ditemukan" });
        }

        await prisma.block.delete({ where: { id } });

        return res.json({ message: "Block berhasil dihapus" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
}

// POST /api/blocks/reorder
// body: { noteId, blocks: [{ id, orderIndex }, ...] }
async function reorder(req, res) {
    try {
        const { noteId, blocks } = req.body;

        if (!noteId || !Array.isArray(blocks)) {
            return res.status(400).json({ message: "noteId dan blocks wajib diisi" });
        }

        const note = await assertNoteOwnership(Number(noteId), req.user.id);
        if (!note) {
            return res.status(404).json({ message: "Note tidak ditemukan" });
        }

        // pastikan semua block yang dikirim benar-benar milik note ini
        const blockIds = blocks.map((b) => Number(b.id));
        const existingBlocks = await prisma.block.findMany({
            where: { id: { in: blockIds }, noteId: Number(noteId) },
            select: { id: true },
        });
        if (existingBlocks.length !== blockIds.length) {
            return res.status(400).json({ message: "Ada block yang tidak valid" });
        }

        // update order_index semua block sekaligus dalam satu transaction
        await prisma.$transaction(
            blocks.map((b) =>
                prisma.block.update({
                    where: { id: Number(b.id) },
                    data: { orderIndex: b.orderIndex },
                })
            )
        );

        await prisma.note.update({
            where: { id: Number(noteId) },
            data: { updatedAt: new Date() },
        });

        return res.json({ message: "Urutan berhasil disimpan" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
}

module.exports = { create, update, remove, reorder };
