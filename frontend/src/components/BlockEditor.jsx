import { useState, useEffect, useCallback } from "react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { Plus, Type, CheckSquare, Image as ImageIcon, Code2 } from "lucide-react";
import SortableBlock from "./SortableBlock";
import useDebouncedCallback from "../hooks/useDebouncedCallback";
import { createBlock, updateBlock, deleteBlock, reorderBlocks } from "../api/blocks";

const BLOCK_TYPES = [
    { type: "text", label: "Text", icon: Type },
    { type: "checklist", label: "Checklist", icon: CheckSquare },
    { type: "image", label: "Image", icon: ImageIcon },
    { type: "code", label: "Code", icon: Code2 },
];

export default function BlockEditor({ noteId, initialBlocks }) {
    const [blocks, setBlocks] = useState(initialBlocks || []);
    const [showMenu, setShowMenu] = useState(false);
    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

    useEffect(() => setBlocks(initialBlocks || []), [noteId]);

    // Autosave konten block (debounce, biar tidak spam request tiap ketikan)
    const debouncedSave = useDebouncedCallback((id, data) => {
        updateBlock(id, data).catch(() => {});
    }, 600);

    const handleChange = useCallback(
        (id, data) => {
            setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));
            debouncedSave(id, data);
        },
        [debouncedSave]
    );

    const handleToggle = (id) => {
        setBlocks((prev) => {
            const next = prev.map((b) => (b.id === id ? { ...b, isChecked: !b.isChecked } : b));
            const toggled = next.find((b) => b.id === id);
            updateBlock(id, { isChecked: toggled.isChecked }).catch(() => {});
            return next;
        });
    };

    const handleDelete = async (id) => {
        setBlocks((prev) => prev.filter((b) => b.id !== id));
        try {
            await deleteBlock(id);
        } catch {}
    };

    const handleAddBlock = async (type) => {
        setShowMenu(false);
        const defaults = { text: "", checklist: "Tugas baru", image: "", code: "// kode di sini" };
        const orderIndex = blocks.length;

        // optimistic: tampil dulu dengan id sementara
        const tempId = "temp-" + Date.now();
        setBlocks((prev) => [
            ...prev,
            { id: tempId, type, content: defaults[type], isChecked: false, orderIndex },
        ]);

        try {
            const created = await createBlock({ noteId, type, content: defaults[type], orderIndex });
            setBlocks((prev) => prev.map((b) => (b.id === tempId ? created : b)));
        } catch {
            setBlocks((prev) => prev.filter((b) => b.id !== tempId));
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setBlocks((prev) => {
            const oldIndex = prev.findIndex((b) => b.id === active.id);
            const newIndex = prev.findIndex((b) => b.id === over.id);
            const reordered = arrayMove(prev, oldIndex, newIndex).map((b, i) => ({
                ...b,
                orderIndex: i,
            }));

            reorderBlocks(
                noteId,
                reordered.map((b) => ({ id: b.id, orderIndex: b.orderIndex }))
            ).catch(() => {});

            return reordered;
        });
    };

    return (
        <div>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                    {blocks.map((block) => (
                        <SortableBlock
                            key={block.id}
                            block={block}
                            onChange={handleChange}
                            onToggle={handleToggle}
                            onDelete={handleDelete}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            <div style={{ position: "relative", marginTop: 10 }}>
                <button
                    onClick={() => setShowMenu((v) => !v)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        border: "none",
                        background: "transparent",
                        color: "var(--color-ink-muted)",
                        fontSize: 13.5,
                        cursor: "pointer",
                        padding: "6px 4px",
                    }}
                >
                    <Plus size={15} /> Tambah block
                </button>

                {showMenu && (
                    <div
                        style={{
                            position: "absolute",
                            top: 32,
                            left: 0,
                            background: "#fff",
                            border: "1px solid var(--color-border)",
                            borderRadius: 8,
                            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                            padding: 6,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            zIndex: 10,
                            minWidth: 160,
                        }}
                    >
                        {BLOCK_TYPES.map(({ type, label, icon: Icon }) => (
                            <button
                                key={type}
                                onClick={() => handleAddBlock(type)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    border: "none",
                                    background: "transparent",
                                    borderRadius: 5,
                                    padding: "7px 8px",
                                    fontSize: 13.5,
                                    color: "var(--color-ink)",
                                    cursor: "pointer",
                                    textAlign: "left",
                                }}
                            >
                                <Icon size={15} />
                                {label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
