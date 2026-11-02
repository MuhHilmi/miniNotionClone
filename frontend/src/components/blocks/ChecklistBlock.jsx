import { Check } from "lucide-react";

export default function ChecklistBlock({ content, isChecked, onChange, onToggle }) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                padding: "8px 0",
                minHeight: 48,
            }}
        >
            <button
                onClick={onToggle}
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    border: `1.5px solid ${isChecked ? "var(--color-teal)" : "var(--color-border)"}`,
                    background: isChecked ? "var(--color-teal)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                    minWidth: 32,
                    minHeight: 32,
                }}
            >
                {isChecked && <Check size={16} color="#fff" />}
            </button>
            <input
                value={content}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    fontSize: 16,
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    width: "100%",
                    color: isChecked ? "var(--color-ink-muted)" : "var(--color-ink)",
                    textDecoration: isChecked ? "line-through" : "none",
                    padding: "4px 0",
                    minHeight: 44,
                }}
            />
        </div>
    );
}
