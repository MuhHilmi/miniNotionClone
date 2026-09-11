import { Check } from "lucide-react";

export default function ChecklistBlock({ content, isChecked, onChange, onToggle }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
            <button
                onClick={onToggle}
                style={{
                    width: 17,
                    height: 17,
                    borderRadius: 4,
                    border: `1.5px solid ${isChecked ? "var(--color-teal)" : "var(--color-border)"}`,
                    background: isChecked ? "var(--color-teal)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                }}
            >
                {isChecked && <Check size={12} color="#fff" />}
            </button>
            <input
                value={content}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    fontSize: 15,
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    width: "100%",
                    color: isChecked ? "var(--color-ink-muted)" : "var(--color-ink)",
                    textDecoration: isChecked ? "line-through" : "none",
                }}
            />
        </div>
    );
}
