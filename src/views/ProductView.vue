<template>
  <div class="container mt-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold text-primary">
        <i class="bi bi-box-seam me-2"></i> Daftar Produk
      </h2>
      
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Memuat data produk...</p>
    </div>

    <!-- Error -->
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <!-- Data Produk -->
    <div v-if="products && products.length" class="card shadow-sm border-0">
      <div class="card-body">
        <table class="table table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th>Nama Produk</th>
              <th class="text-center">Stok</th>
              <th class="text-end">SKU Produk</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td class="fw-medium">
                <i class="bi bi-cube me-2 text-primary"></i>
                {{ product.product_name }}
              </td>
              
              <td class="text-center">
                <span 
                >
                 {{ product.unit }}
                  {{ product.stock }}
                </span>
              </td>
              <td class="text-end">
                {{ product.sku }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Jika kosong -->
    <div v-else-if="!loading" class="alert alert-info text-center">
      <i class="bi bi-info-circle me-1"></i> Tidak ada produk yang tersedia.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/plugins/axios";

const products = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchProducts = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Tidak ada token autentikasi. Silakan login kembali.");
    }

    const response = await axios.get("/api/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    products.value = response.data.products;
  } catch (err) {
    console.error("Gagal mengambil data produk:", err);
    if (err.response && err.response.status === 403) {
      error.value =
        "Akses ditolak. Anda tidak memiliki izin untuk melihat halaman ini.";
    } else {
      error.value = "Gagal memuat produk. Silakan coba lagi.";
    }
  } finally {
    loading.value = false;
  }
};

const formatPrice = (value) => {
  if (!value) return "0";
  return new Intl.NumberFormat("id-ID").format(value);
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>

.badge {
  font-size: 0.9rem;
  padding: 0.4em 0.6em;
}
</style>
