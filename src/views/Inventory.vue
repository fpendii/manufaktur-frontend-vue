<template>
  <div>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Stok Barang Jadi</h2>
      <div v-if="loading" class="text-center">Memuat data...</div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <div v-if="products.length > 0" class="table-responsive">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID Produk</th>
              <th>Nama Produk</th>
              <th>Stok Tersedia</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.id }}</td>
              <td>{{ product.product_name }}</td>
              <td>{{ product.stock }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else-if="!loading" class="alert alert-info text-center">
        Tidak ada produk dalam inventaris.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const products = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchInventory = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8000/api/inventory', {
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