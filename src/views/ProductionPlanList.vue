<template>
  <div class="container mt-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-primary fw-bold mb-0">
        <i class="bi bi-calendar-check me-2"></i> Daftar Rencana Produksi
      </h2>
      <router-link to="/ajukan-produksi" class="btn btn-primary">
        <i class="bi bi-plus-lg me-1"></i> Tambah Ajukan
      </router-link>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2">Memuat data...</p>
    </div>

    <!-- Error -->
    <div v-if="error" class="alert alert-danger text-center">
      <i class="bi bi-exclamation-triangle me-1"></i> {{ error }}
    </div>

    <!-- Table Rencana Produksi -->
    <div v-if="plans.length > 0" class="card shadow-sm border-0">
      <div class="card-body table-responsive">
        <table class="table table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th>No</th>
              <th>Produk</th>
              <th class="text-center">Jumlah</th>
              <th>Tanggal Jatuh Tempo</th>
              <th>Status</th>
              <th>Dibuat Oleh</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(plan, index) in plans" :key="plan.id">
              <td>{{ index + 1 }}</td>
              <td>
                <i class="bi bi-box-seam me-1 text-primary"></i>
                {{ plan.product.product_name }}
              </td>
              <td class="text-center">{{ plan.quantity }}</td>
              <td>
                <i class="bi bi-calendar-event me-1 text-muted"></i>
                {{ plan.due_date }}
              </td>
              <td>
                <span
                  class="badge px-3 py-2"
                  :class="{
                    'bg-warning text-dark': plan.status === 'menunggu persetujuan',
                    'bg-success': plan.status === 'disetujui',
                    'bg-danger': plan.status === 'ditolak'
                  }"
                >
                  <i
                    class="bi me-1"
                    :class="{
                      'bi-hourglass-split': plan.status === 'menunggu persetujuan',
                      'bi-check-circle': plan.status === 'disetujui',
                      'bi-x-circle': plan.status === 'ditolak'
                    }"
                  ></i>
                  {{ plan.status }}
                </span>
              </td>
              <td>
                <i class="bi bi-person-circle me-1 text-secondary"></i>
                {{ plan.user.name }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!loading" class="alert alert-info text-center mt-3">
      <i class="bi bi-info-circle me-1"></i>
      Tidak ada rencana produksi yang menunggu persetujuan.
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
/* Hover efek pada tabel */
.table-hover tbody tr:hover {
  background-color: #f1f1f1;
  transition: 0.2s;
}
</style>
