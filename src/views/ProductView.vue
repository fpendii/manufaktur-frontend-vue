<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Daftar Produk</h2>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    
    <table v-if="products && products.length" class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Nama Produk</th>
          <th>Stok</th>
          <th>Harga</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.product_name }}</td>
          <td>{{ product.unit }}</td>
          <td>{{ product.sku }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else-if="!loading" class="alert alert-info text-center">
      Tidak ada produk yang tersedia.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from "@/plugins/axios";

const products = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchProducts = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Tidak ada token autentikasi. Silakan login kembali.');
    }
    
    // Perbaikan di URL
    const response = await axios.get('/api/products', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    products.value = response.data.products;
    
  } catch (err) {
    console.error('Gagal mengambil data produk:', err);
    if (err.response && err.response.status === 403) {
      error.value = 'Akses ditolak. Anda tidak memiliki izin untuk melihat halaman ini.';
    } else {
      error.value = 'Gagal memuat produk. Silakan coba lagi.';
    }
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
/* Anda bisa menambahkan gaya Bootstrap di sini jika belum diimpor secara global */
</style>