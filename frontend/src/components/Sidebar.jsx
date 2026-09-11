import { useState } from "react";
import { LogOut, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth";

export default function Sidebar({ notes, activeNoteId, onSelectNote, onNewNote }) {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const filtered = notes.filter((n) =>
        n.title.toLowerCase().includes(query.toLowerCase())
    );

    const handleLogout = async () => {
        try {
            await logoutUser();
        } finally {
            navigate("/login");
        }
    }

    return (
        <div
            style={{
                width: 240,
                flexShrink: 0,
                background: "var(--color-sidebar)",
                borderRight: "1px solid var(--color-border)",
                padding: "20px 16px",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                height: "100vh",
            }}
        >
            <div>
                <button
                    onClick={onNewNote}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        background: "var(--color-ink)",
                        color: "var(--color-bg)",
                        border: "none",
                        borderRadius: 6,
                        padding: "9px 12px",
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: "pointer",
                        marginBottom: 16,
                    }}
                >
                    <Plus size={15} /> Note baru
                </button>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        background: "var(--color-bg)",
                        border: "1px solid var(--color-border)",
                        borderRadius: 6,
                        padding: "7px 10px",
                        marginBottom: 18,
                    }}
                >
                    <Search size={14} color="var(--color-ink-muted)" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari note"
                        style={{
                            border: "none",
                            outline: "none",
                            background: "transparent",
                            fontSize: 13,
                            width: "100%",
                        }}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
                    {filtered.map((n) => (
                        <button
                            key={n.id}
                            onClick={() => onSelectNote(n.id)}
                            style={{
                                textAlign: "left",
                                background: activeNoteId === n.id ? "var(--color-bg)" : "transparent",
                                border: "none",
                                borderRadius: 6,
                                padding: "8px 10px",
                                fontSize: 13.5,
                                fontWeight: activeNoteId === n.id ? 500 : 400,
                                color: activeNoteId === n.id ? "var(--color-ink)" : "var(--color-ink-muted)",
                                cursor: "pointer",
                            }}
                        >
                            {n.title}
                        </button>
                    ))}
                </div>
            </div>

            <div
                style={{
                    borderTop: "1px solid var(--color-border)",
                    paddingTop: 12,
                    marginTop: 12,
                }}
            >
                <button
                    onClick={handleLogout}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        border: "none",
                        background: "transparent",
                        color: "var(--color-ink-muted)",
                        fontSize: 13,
                        cursor: "pointer",
                        padding: "6px 4px",
                        width: "100%",
                    }}
                >
                    <LogOut size={15} /> Logout
                </button>
            </div>
        </div>
    );
}
