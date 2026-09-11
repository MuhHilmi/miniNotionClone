import { Image as ImageIcon } from "lucide-react";

export default function ImageBlock({ content, onChange }) {
    return (
        <div style={{ width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                <div
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: 5,
                        background: "#EFE7D4",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                    }}
                >
                    <ImageIcon size={16} color="var(--color-gold)" />
                </div>
                <input
                    value={content}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="URL gambar..."
                    style={{
                        fontSize: 13.5,
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        width: "100%",
                        color: "var(--color-ink-muted)",
                    }}
                />
            </div>
            {content && (
                <img
                    src={content}
                    alt=""
                    style={{ maxWidth: "100%", borderRadius: 6, marginTop: 4 }}
                    onError={(e) => (e.target.style.display = "none")}
                />
            )}
        </div>
    );
}
