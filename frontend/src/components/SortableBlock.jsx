import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import TextBlock from "./blocks/TextBlock";
import ChecklistBlock from "./blocks/ChecklistBlock";
import ImageBlock from "./blocks/ImageBlock";
import CodeBlock from "./blocks/CodeBlock";

const BORDER_COLOR = {
    text: "var(--color-ink)",
    checklist: "var(--color-teal)",
    image: "var(--color-gold)",
    code: "var(--color-violet)",
};

export default function SortableBlock({ block, onChange, onToggle, onDelete }) {
    const [hovered, setHovered] = useState(false);
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: block.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={{
                ...style,
                display: "flex",
                alignItems: block.type === "text" ? "flex-start" : "center",
                gap: 8,
                borderLeft: `2px solid ${BORDER_COLOR[block.type]}`,
                paddingLeft: 12,
                marginBottom: 10,
                minHeight: 36,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <span
                {...attributes}
                {...listeners}
                style={{
                    cursor: "grab",
                    opacity: hovered ? 1 : 0,
                    transition: "opacity 0.12s ease",
                    flexShrink: 0,
                    display: "flex",
                }}
            >
                <GripVertical size={15} color="var(--color-ink-muted)" />
            </span>

            <div style={{ flex: 1, minWidth: 0 }}>
                {block.type === "text" && (
                    <TextBlock content={block.content} onChange={(v) => onChange(block.id, { content: v })} />
                )}
                {block.type === "checklist" && (
                    <ChecklistBlock
                        content={block.content}
                        isChecked={block.isChecked}
                        onChange={(v) => onChange(block.id, { content: v })}
                        onToggle={() => onToggle(block.id)}
                    />
                )}
                {block.type === "image" && (
                    <ImageBlock content={block.content} onChange={(v) => onChange(block.id, { content: v })} />
                )}
                {block.type === "code" && (
                    <CodeBlock content={block.content} onChange={(v) => onChange(block.id, { content: v })} />
                )}
            </div>

            <button
                onClick={() => onDelete(block.id)}
                style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    opacity: hovered ? 1 : 0,
                    transition: "opacity 0.12s ease",
                    flexShrink: 0,
                }}
            >
                <Trash2 size={14} color="var(--color-ink-muted)" />
            </button>
        </div>
    );
}
