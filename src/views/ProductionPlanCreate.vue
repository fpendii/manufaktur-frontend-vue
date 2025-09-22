<template>
  <div class="container mt-4">
    <h2 class="mb-4 text-primary fw-bold">
      <i class="bi bi-pencil-square me-2"></i> Ajukan Rencana Produksi
    </h2>

    <div class="card shadow p-4">
      <!-- Pesan sukses/error -->
      <div v-if="successMessage" class="alert alert-success text-center">
        <i class="bi bi-check-circle me-1"></i> {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="alert alert-danger text-center">
        <i class="bi bi-exclamation-triangle me-1"></i> {{ errorMessage }}
      </div>

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
            placeholder="Masukkan jumlah produk"
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
          <label for="notes" class="form-label">Catatan (Opsional)</label>
          <textarea
            v-model="form.notes"
            class="form-control"
            id="notes"
            rows="3"
            placeholder="Masukkan catatan tambahan"
          ></textarea>
        </div>

        <div class="d-flex flex-column flex-md-row gap-2">
          <router-link
            to="/rencana-produksi"
            class="btn btn-secondary w-100"
          >
            <i class="bi bi-x-circle me-1"></i> Batal
          </router-link>
          <button type="submit" class="btn btn-primary w-100">
            <i class="bi bi-send me-1"></i> Kirim Rencana
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from "@/plugins/axios";
import { useRouter } from 'vue-router';

const products = ref([]);
const form = ref({
  product_id: '',
  quantity: null,
  due_date: '',
  notes: '',
});
const successMessage = ref('');
const errorMessage = ref('');
const router = useRouter();

// Fetch produk untuk dropdown
const fetchProducts = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('/api/products', {
      headers: { Authorization: `Bearer ${token}` },
    });
    products.value = response.data.products;
  } catch (err) {
    console.error('Error fetching products:', err);
    errorMessage.value = 'Gagal memuat daftar produk.';
  }
};

// Submit form
const submitPlan = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('/api/production-plans', form.value, {
      headers: { Authorization: `Bearer ${token}` },
    });

    successMessage.value = response.data.message || 'Rencana berhasil diajukan';
    errorMessage.value = '';

    setTimeout(() => {
      router.push({ name: 'rencana-produksi' });
    }, 1000);

  } catch (err) {
    console.error('Error submitting plan:', err.response);
    errorMessage.value = (err.response?.data?.message) || 'Gagal mengajukan rencana. Periksa data Anda.';
    successMessage.value = '';
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.card {
  transition: 0.3s;
}
.card:hover {
  transform: translateY(-2px);
}
</style>
