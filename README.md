# 🚀 Taskflow - Modern To-Do List Application

Taskflow adalah aplikasi To-Do List modern, responsif, dan minimalis yang dibangun dengan **Node.js (Express.js REST API)** di sisi Backend dan **Modular Vanilla JavaScript + Tailwind CSS** di sisi Frontend.

---

## 🌟 Fitur Utama

- **CRUD Task:** Tambah, Edit, Hapus (dengan konfirmasi), serta tandai Selesai/Belum Selesai.
- **Metadata Task:** Prioritas (*High, Medium, Low*), Tanggal Deadline (dengan indikator *Hari ini / Overdue*), serta Tag Kategori.
- **Pencarian & Filter:** Filter status (*Semua, Belum Selesai, Selesai*) & Pencarian judul/kategori real-time.
- **Pengurutan (Sorting):** Urutkan berdasarkan *Terbaru, Terlama, Prioritas*, atau *Deadline Terdekat*.
- **Hapus Massal:** Fitur "Clear Completed" dengan dialog konfirmasi.
- **Toast Notification & Dynamic Stats:** Notifikasi toast animasi dan counter statistik real-time.
- **Fallback Offline:** Jika backend tidak terjangkau, otomatis beralih ke `localStorage`.

---

## 📂 Struktur Project Modular

```text
├── package.json
├── render.yaml           # Konfigurasi deploy ke Render.com
├── vercel.json            # Konfigurasi deploy ke Vercel
├── .env.example
├── server/                # BACKEND (REST API Express)
│   ├── index.js           # Server Express entrypoint
│   ├── config/
│   │   └── db.js          # Controller Database (File JSON Store)
│   ├── controllers/
│   │   └── taskController.js # Logika CRUD Task
│   └── routes/
│       └── taskRoutes.js  # API Endpoint Task
└── public/                # FRONTEND (Modular ES Modules)
    ├── index.html         # Clean HTML Shell
    ├── css/
    │   └── style.css      # Animasi & Kustom Styling
    └── js/
        ├── api.js         # API Fetcher Service (dengan Offline Fallback)
        ├── store.js       # Central State Management (Pub/Sub pattern)
        ├── main.js        # Main App Orchestrator
        └── components/    # Komponen UI Terpisah
            ├── Header.js
            ├── Stats.js
            ├── Toolbar.js
            ├── TaskItem.js
            ├── TaskList.js
            ├── TaskModal.js
            ├── ConfirmModal.js
            └── Toast.js
```

---

## 💻 Jalankan Lokal (Development)

1. **Install Dependensi:**
   ```bash
   npm install
   ```

2. **Jalankan Server Backend & Frontend:**
   ```bash
   npm start
   ```

3. Buka browser di `http://localhost:3000`.

---

## 🌐 Cara Deploy ke Cloud (Siap Deploy)

### 1. Deploy ke Render.com (Direkomendasikan)
1. Push project ini ke repository GitHub Anda.
2. Buka [Render Dashboard](https://dashboard.render.com/) -> Pilih **New Web Service**.
3. Hubungkan repository GitHub Anda.
4. Render akan otomatis mendeteksi file `render.yaml` atau isi settingan berikut:
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Klik **Create Web Service**. Aplikasi siap diakses!

### 2. Deploy ke Vercel
1. Install Vercel CLI atau hubungkan ke Vercel via GitHub Dashboard.
2. File `vercel.json` sudah disediakan, jalankan:
   ```bash
   vercel
   ```

### 3. Deploy ke Railway / Fly.io / Glitch
- Cukup hubungkan repository GitHub Anda.
- Jalankan perintah build: `npm install` dan start: `npm start`.
