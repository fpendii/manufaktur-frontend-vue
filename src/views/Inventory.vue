<template>
  <div class="container mt-4">
    <h2 class="mb-4 text-primary fw-bold">
      <i class="bi bi-box-seam me-2"></i> Stok Barang Jadi
    </h2>

    <!-- Loading -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2">Memuat data...</p>
    </div>

    <!-- Error -->
    <div v-if="error" class="alert alert-danger text-center">
      <i class="bi bi-exclamation-triangle me-1"></i> {{ error }}
    </div>

    <!-- Tabel Produk -->
    <div v-if="products.length > 0" class="table-responsive shadow-sm">
      <table class="table table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th>No</th>
            <th>Nama Produk</th>
            <th class="text-center">Stok Tersedia</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="product.id">
            <td>{{ index + 1 }}</td>
            <td>
              <i class="bi bi-box-seam me-1 text-primary"></i>
              {{ product.product_name }}
            </td>
            <td class="text-center">
              <span
                class="badge"
                :class="{
                  'bg-success': product.stock > 0,
                  'bg-danger': product.stock === 0
                }"
              >
                {{ product.stock }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-else-if="!loading" class="alert alert-info text-center">
      <i class="bi bi-info-circle me-1"></i>
      Tidak ada produk dalam inventaris.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from "@/plugins/axios";

const products = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchInventory = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('/api/inventory', {
      headers: { Authorization: `Bearer ${token}` },
    });
    products.value = response.data.products;
  } catch (err) {
    console.error('Gagal memuat inventaris:', err);
    error.value = 'Gagal memuat data inventaris.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchInventory();
});
</script>
