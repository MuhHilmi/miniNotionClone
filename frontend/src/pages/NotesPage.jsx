import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import NewNoteModal from "../components/NewNoteModal";
import BlockEditor from "../components/BlockEditor";
import { getNotes, getNote, createNote } from "../api/notes";

export default function NotesPage() {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [activeNoteId, setActiveNoteId] = useState(null);
    const [activeNote, setActiveNote] = useState(null);
    const [showModal, setShowModal] = useState(false);
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

    const handleNewNote = async (title) => {
        const note = await createNote({ title });
        setNotes((prev) => [note, ...prev]);
        setActiveNoteId(note.id);
    };

    if (loading) return null;

    return (
        <div style={{ display: "flex" }}>
            <Sidebar
                notes={notes}
                activeNoteId={activeNoteId}
                onSelectNote={setActiveNoteId}
                onNewNote={() => setShowModal(true)}
            />

            <div style={{ flex: 1, padding: "40px 56px", maxWidth: 760 }}>
                {activeNote ? (
                    <>
                        <h1
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: 32,
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
