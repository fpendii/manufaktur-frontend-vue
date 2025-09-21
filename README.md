
### `README.md` Repositori Frontend (Vue.js)

```markdown
# Manufaktur-Frontend-Vue

Proyek ini adalah bagian frontend dari sistem manufaktur yang dibangun dengan framework **Vue.js 3** dan menggunakan **Vue Router** untuk navigasi. Frontend ini berinteraksi dengan API backend yang dibuat dengan Laravel.

## Fitur Utama

* **Login**: Halaman login untuk pengguna.
* **Rencana Produksi**: Halaman untuk Staff PPIC membuat rencana produksi.
* **Order Produksi**: Halaman untuk Staff Produksi melihat dan mengelola order.
* **Laporan Produksi**: Halaman untuk Manajer dan Staff PPIC melihat laporan.
* **Log Produksi**: Halaman untuk melihat riwayat perubahan status setiap order.
* **Inventaris**: Halaman untuk melihat stok barang jadi di gudang.

## Pratinjau Tampilan

Berikut adalah contoh tangkapan layar dari beberapa halaman utama:

* **Halaman Login**
    

* **Halaman Rencana Produksi**
    

* **Halaman Order Produksi**
    

## Persyaratan Sistem

* Node.js (LTS)
* npm atau yarn

## Cara Menjalankan Proyek

1.  **Kloning Repositori**:
    ```bash
    git clone https://github.com/username/manufaktur-frontend-vue.git
    cd manufaktur-frontend-vue
    ```

2.  **Instalasi Dependensi**:
    ```bash
    npm install
    ```

3.  **Konfigurasi API**:
    * Buka file `src/main.js` atau file konfigurasi `axios` Anda. Pastikan baseURL mengarah ke API Laravel.
    ```javascript
    // src/main.js
    import axios from 'axios';
    axios.defaults.baseURL = 'http://localhost:8000/api'; /
    *** NOTE : Pastikan backend berjalan di url 'http://localhost:8000', karna jika tidak banyak halaman front end yang akan error
    ```

4.  **Jalankan Server**:
    ```bash
    npm run dev
    ```
    Aplikasi akan berjalan di `http://localhost:5173` atau port lain yang tersedia.

## Link Repositori Terkait

* **Backend (Laravel)**: [https://github.com/username/manufaktur-backend-v10](https://github.com/username/manufaktur-backend-v10)

...
* **Halaman Login**
    ![Halaman Login]https://github.com/fpendii/manufaktur-frontend-vue/blob/main/screenshot/login.png

* **Halaman Rencana Produksi**
    ![Halaman Rencana Produksi](URL_GAMBAR_RENCANA_PRODUKSI_DISINI)

* **Halaman Order Produksi**
    ![Halaman Order Produksi](URL_GAMBAR_ORDER_PRODUKSI_DISINI)
...
