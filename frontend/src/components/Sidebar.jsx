import { useState } from "react";
import { LogOut, Plus, Search, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth";

export default function Sidebar({
    notes,
    activeNoteId,
    onSelectNote,
    onNewNote,
    isMobile = false,
    isOpen = false,
    onToggle,
}) {
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
    };

    // On mobile, only render when drawer is open
    if (isMobile && !isOpen) {
        return null;
    }

    return (
        <div
            style={{
                width: isMobile ? 280 : 240,
                flexShrink: 0,
                background: "var(--color-sidebar)",
                ...(isMobile
                    ? {
                          position: "fixed",
                          top: 0,
                          left: 0,
                          height: "100vh",
                          zIndex: 50,
                          boxShadow: "2px 0 12px rgba(0,0,0,0.15)",
                          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
                          transition: "transform 0.3s ease",
                      }
                    : {
                          borderRight: "1px solid var(--color-border)",
                      }),
                padding: "20px 16px",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                height: "100vh",
                overflowY: "auto",
            }}
        >
            {/* Close button (X) shown only on mobile drawer */}
            {isMobile && (
                <button
                    onClick={onToggle}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "transparent",
                        border: "none",
                        color: "var(--color-ink)",
                        fontSize: 20,
                        cursor: "pointer",
                        marginBottom: 20,
                        padding: 10,
                        width: 44,
                        height: 44,
                        minWidth: 44,
                        minHeight: 44,
                    }}
                >
                    <X size={20} />
                </button>
            )}

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
                        padding: "12px 16px",
                        fontSize: 14,
                        fontWeight: 500,
                        cursor: "pointer",
                        marginBottom: 16,
                        width: "100%",
                        minHeight: 44,
                    }}
                >
                    <Plus size={18} /> Note baru
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
                            minHeight: 44,
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
                                padding: "12px 14px",
                                fontSize: 14,
                                fontWeight: activeNoteId === n.id ? 500 : 400,
                                color: activeNoteId === n.id ? "var(--color-ink)" : "var(--color-ink-muted)",
                                cursor: "pointer",
                                width: "100%",
                                minHeight: 44,
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
                        padding: "10px 4px",
                        width: "100%",
                        minHeight: 44,
                    }}
                >
                    <LogOut size={17} /> Logout
                </button>
            </div>
        </div>
    );
}
