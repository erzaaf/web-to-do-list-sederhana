# 📚 Documentation & Architecture Specs

## Arsitektur Aplikasi

Aplikasi To-Do List ini dirancang dengan struktur terpisah (*Decoupled Architecture*):

- **Frontend:** Modular Vanilla JavaScript (ES Modules), Tailwind CSS, Lucide Icons.
- **Backend:** Node.js, Express.js REST API, Middleware Error Handler.
- **Database Layer:** File Store / Migration-ready SQL Schema.

## Endpoint API REST

| Method | Endpoint | Deskripsi |
| --- | --- | --- |
| GET | `/api/tasks` | Mengambil seluruh daftar task |
| POST | `/api/tasks` | Membuat task baru |
| PUT | `/api/tasks/:id` | Mengedit/memperbarui task |
| PATCH | `/api/tasks/:id/toggle` | Mengubah status selesai/belum selesai |
| DELETE | `/api/tasks/:id` | Menghapus satu task |
| DELETE | `/api/tasks/completed/clear` | Menghapus semua task selesai |
