# TASK-LIST: Mobile Friendly — Mini Notion Clone

Daftar perubahan yang akan dilakukan untuk menjadikan project Mini Notion Clone mobile-friendly (responsive di layar ponsel).

---

## A. CSS & Tata Letak Umum (Responsive Foundation)

- [ ] **Tambahkan viewport meta tag** di `frontend/index.html`:
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ```
- [ ] **Tambahkan media queries** di `frontend/src/index.css` dan `App.css` dengan breakpoint `max-width: 768px` (dan opsi `max-width: 480px` untuk ponsel kecil).
- [ ] **Ubah satuan tetap (`px`) menjadi relatif (`rem`, `%`, `vw`, `vh`)** pada padding, margin, dan ukuran elemen agar menyesuaikan layar.
- [ ] **Atur `box-sizing: border-box`** secara global agar padding tidak menambah lebar elemen.
- [ ] **Pastikan semua gambar responsif** (`max-width: 100%; height: auto;`) terutama di `ImageBlock.jsx`.

---

## B. Komponen `Sidebar.jsx` — Navigasi Mobile

- [ ] **Ubah sidebar menjadi drawer / hamburger menu** di layar < 768px:
  - Sembunyikan sidebar default di mobile.
  - Tambahkan tombol hamburger di header.
  - Saat diklik, sidebar muncul dari kiri (overlay) atau mendorong konten.
- [ ] **Perbesar area sentuh** tombol dan item daftar catatan minimal `44×44 px`.
- [ ] **Tombol "New Note"** diubah menjadi tombol floating atau menurun ke bagian bawah agar mudah diakses jari.

---

## C. Komponen `NotesPage.jsx` — Halaman Utama Catatan

- [ ] **Tata letak kolom tunggal di mobile**: Sidebar dan Block Editor tidak ditampilkan berdampingan, tetapi secara berturut-turut (stack) atau dengan navigasi "kembali ke daftar".
- [ ] **Tambahkan tombol kembali** di header editor mobile untuk kembali ke daftar catatan.
- [ ] **Editor menempati lebar penuh layar** di perangkat kecil.

---

## D. Komponen `BlockEditor.jsx` — Editor Blok

- [ ] **Kecilkan/sederhanakan toolbar TipTap** di mobile (tombol formatting disusun horizontal dengan scroll, atau dropdown).
- [ ] **Pastikan input teks tidak tertutup keyboard virtual** (gunakan `scrollIntoView` atau atur padding bawah saat input aktif).
- [ ] **Atur ukuran font editor minimal `16px`** agar iOS tidak melakukan zoom otomatis saat fokus.

---

## E. Komponen Blok Individu (`components/blocks/`)

- [ ] **`TextBlock.jsx`**: Padding editor disesuaikan agar tidak terlalu sempit di layar kecil.
- [ ] **`ChecklistBlock.jsx`**: Checkbox dan label diperbesar untuk sentuhan jari.
- [ ] **`ImageBlock.jsx`**: Gambar menyesuaikan lebar layar (`max-width: 100%`).
- [ ] **`CodeBlock.jsx`**: Tambahkan `overflow-x: auto` agar kode panjang dapat di-scroll horizontal tanpa merusak tata letak.

---

## F. Komponen `SortableBlock.jsx` — Drag & Drop

- [ ] **Uji dukungan sentuh (`dnd-kit`)** pada layar ponsel; pastikan drag handle cukup besar.
- [ ] **Tambahkan alternatif kontrol urutan** (tombol naikkan/turunkan) jika drag & drop sulit dilakukan dengan jari.

---

## G. Komponen `NewNoteModal.jsx`

- [ ] **Ubah modal menjadi bottom sheet atau layar penuh** di mobile agar form lebih mudah diisi.
- [ ] **Input judul catatan lebar penuh (100%)** dan mudah disentuh.

---

## H. Halaman Autentikasi (`LoginPage.jsx`, `RegisterPage.jsx`)

- [ ] **Pusatkan form auth** dan batasi lebar maksimal agar tidak melebihi layar ponsel.
- [ ] **Input email/password lebar penuh** dengan ukuran font minimal `16px`.
- [ ] **Tombol submit diperbesar** untuk sentuhan jari.

---

## I. Backend (Perhatian Khusus)

- [ ] **Konfigurasikan CORS di Express** agar frontend dari domain/PWA mobile bisa mengakses API.
- [ ] **Pastikan cookie JWT di-set dengan `secure`, `httpOnly`, dan `SameSite`** yang benar agar dikirim dari browser mobile.
- [ ] **Tidak perlu mengubah skema database atau controller** — API yang sama dipakai untuk desktop dan mobile.

---

## J. Pengujian

- [ ] **Uji di Chrome DevTools Device Mode** (variasi ukuran layar: iPhone SE, Pixel, iPhone 12/13/14, dll.).
- [ ] **Uji di perangkat nyata** (Android dan iOS) untuk memastikan sentuhan, keyboard virtual, dan drag & drop berfungsi.
- [ ] **Periksa konsol browser** untuk error CSS/JavaScript khusus mobile.

---

## Prioritas Pelaksanaan (Disarankan)

| Prioritas | Item |
|-----------|------|
| **Tinggi** | Viewport tag, media queries, sidebar drawer, tata layar kolom tunggal di `NotesPage`, editor lebar penuh |
| **Sedang** | Perbesar tap target, gambar responsif, code block scroll, modal bottom sheet |
| **Rendah** | Alternatif tombol urutan, uji perangkat nyata, konfigurasi CORS/cookie |

---

*Disediakan untuk project Mini Notion Clone di `/home/kazuhiko/Dokumen/Code/miniNotionClone`.*