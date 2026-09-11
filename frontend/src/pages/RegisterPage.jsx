import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../lib/validation";
import { registerUser } from "../api/auth";
import AuthLayout from "../components/AuthLayout";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data) => {
        setServerError("");
        try {
            await registerUser({
                email: data.email,
                password: data.password
            });
            navigate("/login")
        } catch (err) {
            setServerError(
                err.response?.data?.message || "Gagal mendaftar, silahkan coba lagi"
            );
        }
    };

    return (
        <AuthLayout title="Buat akun baru">
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                    <label style={labelStyle}>Email</label>
                    <input type="email" style={inputStyle} {...register("email")} />
                    {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
                </div>
                <div>
                    <label style={labelStyle}>Password</label>
                    <input type="password" style={inputStyle} {...register("password")} />
                    {errors.password && <p style={errorStyle}>{errors.password.message}</p>}
                </div>
                <div>
                    <label style={labelStyle}>Konfirmasi Password</label>
                    <input type="password" style={inputStyle} {...register("confirmPassword")} />
                    {errors.confirmPassword && <p style={errorStyle}>{errors.confirmPassword.message}</p>}
                </div>

                {serverError && <p style={errorStyle}>{serverError}</p>}

                <button type="submit" disabled={isSubmitting} style={buttonStyle}>
                    {isSubmitting ? "Memproses..." : "Daftar"}
                </button>
            </form>

        <p style={{ fontSize: 13.5, color: "var(--color-ink-muted)", marginTop: 18 }}>
            Sudah punya akun?{" "}
            <Link to="/login" style={{ color: "var(--color-ink)", fontWeight: 500 }}>
                Masuk
            </Link>
        </p>
        </AuthLayout>
    );
}

const labelStyle = {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    marginBottom: 5,
    color: "var(--color-ink)",
};

const inputStyle = {
    width: "100%",
    padding: "9px 12px",
    fontSize: 14,
    border: "1px solid var(--color-border)",
    borderRadius: 6,
    outline: "none",
    fontFamily: "var(--font-body)",
};

const errorStyle = {
    color: "#B3413E",
    fontSize: 12.5,
    marginTop: 4,
};

const buttonStyle = {
    background: "var(--color-ink)",
    color: "var(--color-bg)",
    border: "none",
    borderRadius: 6,
    padding: "10px 14px",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    marginTop: 6,
};
