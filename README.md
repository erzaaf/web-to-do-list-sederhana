# 📝 Taskflow - Modern Fullstack To-Do List Application

![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)
![Express](https://img.shields.io/badge/Express.js-4.x-blue.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8.svg)
![Architecture](https://img.shields.io/badge/Architecture-Decoupled-purple.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

Taskflow adalah aplikasi manajemen tugas (To-Do List) modern, minimalis, dan responsif dengan arsitektur terpisah (*Decoupled Architecture*) antara **Frontend**, **Backend**, **Database**, dan **Dokumentasi API**.

---

## ✨ Fitur Utama

- ➕ **Manajemen Task (CRUD):** Tambah, Edit, Hapus (dengan modal konfirmasi), serta Tandai Selesai / Belum Selesai.
- 🏷️ **Atribut Lengkap:** Prioritas (*High, Medium, Low*), kategori/tag kustom, dan tanggal deadline dengan indikator visual *Hari ini / Overdue*.
- 🔍 **Pencarian & Filter Real-time:** Filter berdasarkan status (*Semua, Belum Selesai, Selesai*) serta pencarian berbasis judul & kategori.
- 🔀 **Pengurutan (Sorting):** Urutkan tugas berdasarkan *Terbaru*, *Terlama*, *Prioritas*, atau *Deadline Terdekat*.
- 🧹 **Aksi Massal:** Tombol "Clear Completed" untuk menghapus semua tugas yang telah selesai sekaligus.
- 📊 **Statistik & Notifikasi:** Counter statistik real-time (*Total, Pending, Completed*) dan notifikasi Toast interaktif.
- 📱 **Mobile-First & Responsive:** Tampilan clean dengan desain modern pada perangkat mobile, tablet, maupun desktop.
- 🔄 **Offline Fallback:** Otomatis beralih ke `localStorage` jika backend server sedang tidak terjangkau.

---

## 📁 Struktur Project

```text
to-do-list/
├── frontend/
│   ├── public/
│   │   ├── css/
│   │   │   └── style.css       # Custom CSS & animasi toast/modal
│   │   └── index.html          # HTML Shell utama
│   ├── src/
│   │   ├── api/
│   │   │   └── taskApi.js      # Service Fetcher API Backend
│   │   ├── components/         # Komponen UI Terpisah (Modular)
│   │   │   ├── Header.js
│   │   │   ├── Stats.js
│   │   │   ├── Toolbar.js
│   │   │   ├── TaskItem.js
│   │   │   ├── TaskList.js
│   │   │   ├── TaskModal.js
│   │   │   ├── ConfirmModal.js
│   │   │   └── Toast.js
│   │   ├── store/
│   │   │   └── taskStore.js    # State Management (Pub/Sub Store)
│   │   └── main.js             # Frontend App Orchestrator
│   ├── package.json
│   └── .env                    # Environment Variable Frontend
├── backend/
│   ├── src/
│   │   └── index.js            # Express Web Server entrypoint
│   ├── routes/
│   │   └── taskRoutes.js       # Router Endpoint REST API
│   ├── controllers/
│   │   └── taskController.js   # Controller Logic CRUD
│   ├── models/
│   │   └── taskModel.js        # Model Data / Storage Access
│   ├── middleware/
│   │   └── errorHandler.js    # Global Middleware Error Handling
│   ├── .env                    # Environment Variable Backend
│   └── package.json
├── database/
│   ├── migrations/
│   │   └── 001_create_tasks_table.sql # Script pembuatan tabel SQL
│   ├── seeds/
│   │   └── 001_seed_tasks.sql         # Data sampel awal
│   ├── schema.sql                     # Skema SQL Lengkap
│   └── README.md                      # Dokumentasi Skema Database
├── docs/
│   └── README.md                      # Dokumentasi Spesifikasi API REST
├── .gitignore
└── README.md
```

---

## 🛠️ Panduan Instalasi & Jalankan Lokal

### Prerequisites
- [Node.js](https://nodejs.org/) (Versi 18+ direkomendasikan)
- npm (Node Package Manager)

### Langkah-Langkah

1. **Clone repository & Masuk ke folder project:**
   ```bash
   git clone https://github.com/username/to-do-list.git
   cd to-do-list
   ```

2. **Install Dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan Aplikasi:**
   ```bash
   npm start
   ```

4. **Buka Browser:**
   Akses aplikasi melalui URL `http://localhost:5000`.

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
```

### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api/tasks
```

---

## 🌐 Panduan Mengubah Nama Domain

### 1. Pengaturan Domain Lokal (Laptop)
Jika ingin menggunakan domain khusus seperti `http://todolist.local:5000`:
1. Buka file `C:\Windows\System32\drivers\etc\hosts` di Notepad (Run as Administrator).
2. Tambahkan baris di bagian paling bawah:
   ```text
   127.0.0.1   todolist.local
   ```
3. Buka browser di `http://todolist.local:5000`.

### 2. Pengaturan Custom Domain Production (Cloud)
1. **Beli Domain:** Dapatkan domain dari registrar (misal: Cloudflare, Namecheap, Niagahoster).
2. **Setting di Platform Hosting (Render / Vercel):**
   - Masuk ke dashboard Render/Vercel -> **Settings** -> **Custom Domains**.
   - Tambahkan nama domain Anda (misal: `tugasmu.com`).
3. **Setting DNS Management:**
   - Tambahkan **CNAME Record**: `www` ➔ `app-name.onrender.com`
   - Tambahkan **A Record**: `@` ➔ IP Address yang disediakan hosting.

---

## 📡 Endpoint API REST

| Method | Endpoint | Deskripsi | Status Code |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/tasks` | Mengambil seluruh daftar task | `200 OK` |
| **POST** | `/api/tasks` | Membuat task baru | `201 Created` |
| **PUT** | `/api/tasks/:id` | Mengedit / memperbarui task | `200 OK` |
| **PATCH** | `/api/tasks/:id/toggle` | Mengubah status selesai / belum selesai | `200 OK` |
| **DELETE** | `/api/tasks/:id` | Menghapus satu task | `200 OK` |
| **DELETE** | `/api/tasks/completed/clear` | Menghapus seluruh task selesai | `200 OK` |

---

## 🌐 Deploy ke Production (Render.com)

1. Push repository ini ke **GitHub**.
2. Masuk ke [Render Dashboard](https://dashboard.render.com/) -> Pilih **New Web Service**.
3. Hubungkan repository GitHub Anda.
4. Masukkan konfigurasi berikut:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Klik **Create Web Service**.

---

## 📄 Lisensi

Project ini dilindungi di bawah lisensi [MIT License](LICENSE).
