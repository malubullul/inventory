# Ruang Inventaris

Ruang Inventaris adalah aplikasi web untuk mencatat barang kantor per rak, stok masuk, peminjaman, pengembalian, laporan, dan pengelolaan akun admin.

## Fitur Utama

- Dashboard untuk melihat total barang, stok tersedia, pinjaman aktif, dan informasi terbaru.
- Inventaris per rak dengan pencarian barang dan status stok.
- Barang masuk untuk menambah stok barang yang sudah ada atau mencatat barang baru.
- Transaksi alat untuk membuat peminjaman, pengembalian, serta mencatat barang rusak atau hilang.
- Laporan aktivitas dan unduhan laporan PDF.
- Manajemen rak dan akun admin melalui undangan email.

## Yang Dibutuhkan

Sebelum mulai, pastikan sudah tersedia:

- Node.js versi 20.9 atau lebih baru.
- Akun Supabase dan satu project Supabase baru.
- Node Package Manager (`npm`).
- Supabase CLI bila ingin menerapkan database dari terminal.

## 1. Duplikat Project

Fork repository ini melalui GitHub, lalu salin ke komputer Anda.

```bash
git clone https://github.com/NAMA-AKUN-ANDA/NAMA-REPOSITORY.git
cd NAMA-REPOSITORY
npm install
```

Jika tidak melakukan fork, gunakan alamat repository Anda sendiri pada perintah `git clone`.

## 2. Buat Konfigurasi Lokal

Salin file contoh environment.

```bash
copy .env.example .env.local
```

Untuk macOS atau Linux gunakan:

```bash
cp .env.example .env.local
```

Buka `.env.local`, lalu isi nilai dari **Supabase Dashboard → Project Settings → API**.

```env
NEXT_PUBLIC_SUPABASE_URL=https://PROJECT-ANDA.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=publishable_key_anda

# Hanya digunakan server untuk mengundang atau menghapus akun admin.
# Jangan pernah memasukkan nilai ini ke kode browser atau membagikannya.
SUPABASE_SERVICE_ROLE_KEY=service_role_key_anda
```

`.env.local` berisi rahasia project dan tidak boleh diunggah ke GitHub.

## 3. Siapkan Database Supabase

Masuk ke Supabase melalui terminal, hubungkan project, lalu terapkan seluruh perubahan database.

```bash
npx supabase login
npx supabase link --project-ref PROJECT_REF_ANDA
npx supabase db push
```

`PROJECT_REF_ANDA` dapat dilihat pada **Supabase Dashboard → Project Settings → General**.

Folder `supabase/migrations` tidak boleh dihapus. Setiap file di sana adalah riwayat perubahan tabel, keamanan akses, dan fungsi database. Seluruh file akan diterapkan berurutan oleh `supabase db push`.

### Data Inventaris Awal

Jika ingin mengisi contoh atau data inventaris awal, buka **Supabase Dashboard → SQL Editor**, lalu jalankan file berikut sesuai kebutuhan:

- `supabase/seed.sql` untuk data awal dasar.
- `supabase/inventory-seed.sql` untuk data inventaris per rak.

## 4. Buat Super Admin Pertama

Pendaftaran umum tidak tersedia. Buat akun pertama melalui **Supabase Dashboard → Authentication → Users → Add user**.

Setelah akun dibuat, buka **SQL Editor** dan jalankan perintah berikut. Ganti `EMAIL_ADMIN_ANDA` dengan email akun yang baru dibuat.

```sql
update public.profiles
set role = 'super_admin', is_active = true
where id = (
  select id
  from auth.users
  where email = 'EMAIL_ADMIN_ANDA'
);
```

Masuk ke aplikasi menggunakan email dan kata sandi tersebut. Setelah itu, Super Admin dapat membuat undangan untuk admin lain melalui menu **Pengguna**.

## 5. Jalankan Aplikasi

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000), lalu masuk memakai akun Super Admin.

## Cara Menggunakan Aplikasi

1. **Rak** — buat atau periksa rak penyimpanan barang.
2. **Inventaris** — buka rak untuk melihat barang, mencari barang, atau mencatat barang masuk.
3. **Barang Masuk** — pilih barang yang sudah ada untuk menambah stok, atau pilih barang baru untuk membuat data barang dan stok awalnya.
4. **Transaksi Alat** — catat peminjam, barang, jumlah, keperluan, rencana kembali, dan foto serah-terima bila diperlukan.
5. **Pengembalian** — buka transaksi yang masih aktif, masukkan jumlah barang baik, rusak, atau hilang. Stok barang baik akan kembali otomatis.
6. **Laporan** — pilih periode untuk melihat pergerakan barang, peminjaman, dan unduh laporan PDF.
7. **Pengguna** — Super Admin mengundang admin baru melalui email dan dapat menghapus akun yang tidak lagi digunakan.

## Perintah Project

```bash
npm run dev        # Menjalankan aplikasi lokal
npm run lint       # Memeriksa gaya dan masalah kode
npx tsc --noEmit   # Memeriksa tipe TypeScript
npm run build      # Membuat build produksi
npm run start      # Menjalankan hasil build produksi
```

## Deploy ke Vercel

1. Push project ke repository GitHub Anda.
2. Import repository tersebut di [Vercel](https://vercel.com).
3. Tambahkan tiga environment variable yang sama seperti `.env.local` pada **Vercel → Settings → Environment Variables**.
4. Pilih environment **Production** dan **Preview**, lalu deploy ulang.
5. Di Supabase, buka **Authentication → URL Configuration** dan tambahkan URL domain Vercel Anda sebagai Site URL serta Redirect URL.

Jangan menggunakan service role key pada komponen React, browser, atau variabel yang diawali `NEXT_PUBLIC_`.

## Struktur Singkat

```text
src/
  app/        # Halaman dan URL aplikasi
  features/   # Logika inventaris, pinjaman, laporan, rak, dan pengguna
  components/ # Tampilan yang dipakai ulang
  lib/        # Koneksi Supabase dan utilitas umum

supabase/
  migrations/ # Riwayat struktur database
  seed.sql    # Data awal
```

Alur aplikasi sederhana: `halaman → fitur → query atau action → Supabase`.
