<template>
  <div>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Ajukan Rencana Produksi</h2>
      <div class="card shadow p-4 mx-auto" style="max-width: 600px;">
        <form @submit.prevent="submitPlan">
          <div class="mb-3">
            <label for="product_id" class="form-label">Pilih Produk</label>
            <select v-model="form.product_id" class="form-select" id="product_id" required>
              <option disabled value="">Pilih produk...</option>
              <option v-for="product in products" :key="product.id" :value="product.id">
                {{ product.product_name }} ({{ product.unit }})
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="quantity" class="form-label">Jumlah</label>
            <input
              v-model.number="form.quantity"
              type="number"
              class="form-control"
              id="quantity"
              min="1"
              required
            />
          </div>
          <div class="mb-3">
            <label for="due_date" class="form-label">Tanggal Jatuh Tempo</label>
            <input
              v-model="form.due_date"
              type="date"
              class="form-control"
              id="due_date"
              required
            />
          </div>
          <div class="mb-3">
            <label for="notes" class="form-label">Catatan</label>
            <textarea
              v-model="form.notes"
              class="form-control"
              id="notes"
              rows="3"
            ></textarea>
          </div>
          <div class="d-flex justify-content-between">
            <router-link to="/rencana-produksi" class="btn btn-secondary me-2 w-50">Batal</router-link>
            <button type="submit" class="btn btn-primary w-50">Kirim Rencana</button>
          </div>
        </form>
        <div v-if="successMessage" class="alert alert-success mt-3 text-center">
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="alert alert-danger mt-3 text-center">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Impor useRouter

const products = ref([]);
const form = ref({
  product_id: '',
  quantity: null,
  due_date: '',
  notes: '',
});
const successMessage = ref('');
const errorMessage = ref('');
const router = useRouter(); // Inisialisasi router

// Mengambil data produk untuk dropdown dari API
const fetchProducts = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8000/api/products', {
      headers: { Authorization: `Bearer ${token}` },
    });
    products.value = response.data.products;
  } catch (err) {
    console.error('Error fetching products:', err);
    errorMessage.value = 'Gagal memuat daftar produk.';
  }
};

// Mengirim data formulir ke backend
const submitPlan = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:8000/api/production-plans', form.value, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    successMessage.value = response.data.message;
    errorMessage.value = '';
    
    // Alihkan pengguna setelah berhasil
    router.push({ name: 'rencana-produksi' });

  } catch (err) {
    console.error('Error submitting plan:', err.response);
    if (err.response && err.response.data.message) {
      errorMessage.value = err.response.data.message;
    } else {
      errorMessage.value = 'Gagal mengajukan rencana. Periksa data Anda.';
    }
    successMessage.value = '';
  }
};

// Panggil fungsi saat komponen dimuat
onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
/* Anda dapat menambahkan gaya khusus untuk komponen ini di sini */
</style>