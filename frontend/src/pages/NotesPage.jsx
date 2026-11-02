import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import NewNoteModal from "../components/NewNoteModal";
import BlockEditor from "../components/BlockEditor";
import { Menu } from "lucide-react";
import { getNotes, getNote, createNote } from "../api/notes";

export default function NotesPage() {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [activeNoteId, setActiveNoteId] = useState(null);
    const [activeNote, setActiveNote] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth <= 768);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNotes()
            .then((data) => {
                setNotes(data);
                if (data.length > 0) setActiveNoteId(data[0].id);
            })
            .catch((err) => {
                if (err.response?.status === 401) navigate("/login");
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!activeNoteId) return;
        getNote(activeNoteId).then(setActiveNote).catch(() => {});
    }, [activeNoteId]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleNewNote = async (title) => {
        const note = await createNote({ title });
        setNotes((prev) => [note, ...prev]);
        setActiveNoteId(note.id);
        if (isMobile) setSidebarOpen(false);
    };

    if (loading) return null;

    return (
        <div style={{ position: "relative", display: "flex", minHeight: "100vh" }}>
            {/* Hamburger button (mobile only) */}
            {isMobile && (
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "fixed",
                        top: 12,
                        left: 12,
                        zIndex: 60,
                        background: "var(--color-bg)",
                        border: "1px solid var(--color-border)",
                        borderRadius: 6,
                        color: "var(--color-ink)",
                        fontSize: 20,
                        cursor: "pointer",
                        padding: 10,
                        width: 44,
                        height: 44,
                        minWidth: 44,
                        minHeight: 44,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                >
                    <Menu size={20} />
                </button>
            )}

            {/* Overlay backdrop (mobile only, when drawer open) */}
            {isMobile && sidebarOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0,0,0,0.35)",
                        zIndex: 45,
                    }}
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar: always on desktop; conditional on mobile */}
            {!isMobile && (
                <Sidebar
                    notes={notes}
                    activeNoteId={activeNoteId}
                    onSelectNote={setActiveNoteId}
                    onNewNote={() => setShowModal(true)}
                />
            )}
            {isMobile && sidebarOpen && (
                <Sidebar
                    notes={notes}
                    activeNoteId={activeNoteId}
                    onSelectNote={setActiveNoteId}
                    onNewNote={() => setShowModal(true)}
                    isMobile
                    isOpen
                    onToggle={() => setSidebarOpen(false)}
                />
            )}

            {/* Main content */}
            <div
                style={{
                    flex: 1,
                    padding: isMobile ? "60px 16px 16px" : "40px 56px",
                    maxWidth: isMobile ? "100%" : 760,
                    minHeight: "100vh",
                }}
            >
                {activeNote ? (
                    <>
                        {isMobile && (
                            <button
                                onClick={() => setActiveNoteId(null)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    background: "transparent",
                                    border: "none",
                                    color: "var(--color-ink-muted)",
                                    fontSize: 14,
                                    cursor: "pointer",
                                    padding: "8px 0",
                                    marginBottom: 16,
                                }}
                            >
                                ← Kembali ke daftar
                            </button>
                        )}
                        <h1
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: isMobile ? 24 : 32,
                                fontWeight: 500,
                                marginBottom: 6,
                            }}
                        >
                            {activeNote.title}
                        </h1>
                        <div style={{ fontSize: 12, color: "var(--color-ink-muted)", marginBottom: 28 }}>
                            Tersimpan otomatis
                        </div>
                        <BlockEditor noteId={activeNote.id} initialBlocks={activeNote.blocks || []} />
                    </>
                ) : (
                    <p style={{ color: "var(--color-ink-muted)" }}>
                        Belum ada note. Klik "Note baru" untuk mulai.
                    </p>
                )}
            </div>

            {showModal && (
                <NewNoteModal onClose={() => setShowModal(false)} onCreate={handleNewNote} />
            )}
        </div>
    );
}
