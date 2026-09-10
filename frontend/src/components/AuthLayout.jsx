export default function AuthLayout({ title, children }) {
    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-bg)", }}>
            <div style={{ width: 300, background: "#fff", border: "1px solid var(--color-border)", borderRadius: 10, padding: "32px 28px", }}>
                <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 500, marginBottom: 22, color: "var(--color-ink)", }}>
                    {title}
                </h1>
                {children}
            </div>
        </div>
    )
}