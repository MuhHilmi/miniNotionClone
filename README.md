# Mini Notion Clone

Aplikasi pencatatan (note-taking) berbasis block, terinspirasi dari Notion. Mendukung berbagai jenis block (text, checklist, image, code), drag & drop untuk mengatur urutan block, autosave, dan autentikasi JWT berbasis cookie httpOnly.

## Fitur

- Register & Login dengan JWT disimpan di HTTP-Only Cookie
- Setiap user hanya bisa melihat dan mengedit note miliknya sendiri
- CRUD Notes (buat, lihat, edit judul, hapus)
- Block Editor dengan 4 jenis block:
  - **Text** — rich text editor (TipTap)
  - **Checklist** — task dengan checkbox
  - **Image** — insert gambar via URL
  - **Code** — block kode dengan format monospace
- Drag & drop untuk mengubah urutan block (tersimpan otomatis ke database)
- Autosave — perubahan tersimpan otomatis tanpa perlu klik simpan

## Tech Stack

**Backend:** Express, Prisma ORM, MySQL, JWT, bcrypt
**Frontend:** React (Vite), React Hook Form, Zod, dnd-kit, TipTap, TanStack Query, Axios

## Struktur Project

```
notion-clone/
├── backend/     # Express + Prisma + JWT auth
└── frontend/    # React (Vite) + block editor
```

## Prasyarat

- Node.js 18+
- MySQL Server (lokal atau remote), sudah berjalan dan bisa diakses

## Menjalankan Backend

```bash
cd backend
npm install
cp .env.example .env
```

Isi `DATABASE_URL` di `.env` sesuai koneksi MySQL kamu, contoh:
```
DATABASE_URL="mysql://user:password@localhost:3306/notion_clone"
```

Lalu jalankan migrasi dan start server:
```bash
npx prisma migrate dev --name init
npm run dev
```

Backend berjalan di `http://localhost:4000`

## Menjalankan Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend berjalan di `http://localhost:5173`

## Alur Autentikasi

1. Register di `/register` → diarahkan ke halaman Login
2. Login di `/login` → diarahkan ke halaman Notes
3. Logout dari sidebar Notes → diarahkan kembali ke halaman Login

## Skema Database

Model `User`, `Note`, `Block` — lihat detail lengkap di `backend/prisma/schema.prisma`. Model `Block` mendukung `parentId` untuk sub-block bersarang, dan `orderIndex` untuk urutan tampil yang bisa diubah lewat drag & drop.

## Status Pengembangan

- [x] Auth JWT + cookie httpOnly
- [x] CRUD Notes dengan otorisasi per-user
- [x] Block Editor + drag & drop + autosave
- [ ] (Bonus) Realtime WebSocket & history edit — belum dikerjakan
