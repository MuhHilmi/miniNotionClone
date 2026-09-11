import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema } from "../lib/validation";

export default function NewNoteModal({ onClose, onCreate }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(noteSchema) });

    const onSubmit = async (data) => {
        await onCreate(data.title);
        onClose();
    };

    return (
        <div
        style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
        }}
        onClick={onClose}
        >
            <div
                style={{
                    background: "#fff",
                    borderRadius: 10,
                    padding: 24,
                    width: 340,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: 20,
                        fontWeight: 500,
                        marginBottom: 16,
                    }}
                >
                    Note baru
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        autoFocus
                        placeholder="Judul note"
                        style={{
                            width: "100%",
                            padding: "9px 12px",
                            fontSize: 14,
                            border: "1px solid var(--color-border)",
                            borderRadius: 6,
                            outline: "none",
                            marginBottom: 4,
                        }}
                        {...register("title")}
                    />
                    {errors.title && (
                        <p style={{ color: "#B3413E", fontSize: 12.5, marginBottom: 8 }}>
                            {errors.title.message}
                        </p>
                    )}
                    <div style={{ display: "flex", gap: 8, marginTop: 14, justifyContent: "flex-end" }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                border: "1px solid var(--color-border)",
                                background: "transparent",
                                borderRadius: 6,
                                padding: "8px 14px",
                                fontSize: 13.5,
                                cursor: "pointer",
                            }}
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                border: "none",
                                background: "var(--color-ink)",
                                color: "var(--color-bg)",
                                borderRadius: 6,
                                padding: "8px 14px",
                                fontSize: 13.5,
                                cursor: "pointer",
                            }}
                        >
                            {isSubmitting ? "Membuat..." : "Buat"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
