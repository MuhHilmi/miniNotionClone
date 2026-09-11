import { email, z } from "zod";

export const registerSchema = z
    .object({
        email: z.string().email('Email tidak valid'),
        password: z.string().min(6, "Password minimal 6 karakter"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Konfirmasi password tidak sesuai",
        path: ["confirmPassword"],
    });

export const loginSchema = z.object({
    email: z.string().email("Email tidak valid"),
    password: z.string().min(1, "Password wajib diisi"),
});

export const noteSchema = z.object({
    title: z.string().min(1, "Judul wajib diisi").max(100, "Judul maksimal 100 karakter"),
});
