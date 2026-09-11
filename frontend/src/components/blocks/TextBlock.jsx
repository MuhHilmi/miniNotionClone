import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

export default function TextBlock({ content, onChange }) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content || "",
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
    });

    // sinkronisasi kalau content berubah dari luar (misal setelah fetch ulang)
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content || "", false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor]);

    return (
        <EditorContent
            editor={editor}
            style={{ width: "100%", fontSize: 15, lineHeight: 1.6 }}
        />
    );
}
