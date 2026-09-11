export default function CodeBlock({ content, onChange }) {
    return (
        <textarea
            value={content}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            spellCheck={false}
            style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13.5,
                border: "none",
                outline: "none",
                resize: "vertical",
                background: "#F4F2EC",
                borderRadius: 5,
                padding: "8px 10px",
                width: "100%",
                color: "var(--color-ink)",
            }}
        />
    );
}