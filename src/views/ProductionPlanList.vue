<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">Daftar Rencana Produksi</h2>
      <router-link to="/ajukan-produksi" class="btn btn-primary">
        + Tambah Ajukan
      </router-link>
    </div>

    <div v-if="loading" class="text-center">Memuat data...</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-if="plans.length > 0">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Produk</th>
            <th>Jumlah</th>
            <th>Tanggal Jatuh Tempo</th>
            <th>Status</th>
            <th>Dibuat Oleh</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="plan in plans" :key="plan.id">
            <td>{{ plan.id }}</td>
            <td>{{ plan.product.product_name }}</td>
            <td>{{ plan.quantity }}</td>
            <td>{{ plan.due_date }}</td>
            <td>
              <span 
                class="badge" 
                :class="{
                  'bg-warning': plan.status === 'menunggu persetujuan',
                  'bg-success': plan.status === 'disetujui',
                  'bg-danger': plan.status === 'ditolak'
                }"
              >
                {{ plan.status }}
              </span>
            </td>
            <td>{{ plan.user.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="!loading" class="alert alert-info text-center">
      Tidak ada rencana produksi yang tersedia.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from "@/plugins/axios";

const plans = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchPlans = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('/api/production-plans', {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Filter rencana yang statusnya 'menunggu persetujuan'
    plans.value = response.data.plans.filter(plan => plan.status === 'menunggu persetujuan');
  } catch (err) {
    console.error('Gagal memuat rencana:', err);
    error.value = 'Gagal memuat daftar rencana produksi.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPlans();
});
</script>

<style scoped>
/* Gaya yang sama seperti halaman produk */
</style>