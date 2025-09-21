<template>
  <div>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Laporan Produksi Selesai</h2>
      
      <div v-if="loading" class="text-center">Memuat laporan...</div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <div v-if="reports.length > 0">
        <div class="row mb-4">
          <div class="col-md-6">
            <div class="card bg-success text-white">
              <div class="card-body">
                <h5 class="card-title">Total Produk Selesai</h5>
                <p class="card-text fs-3">{{ totalActualQuantity }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card bg-danger text-white">
              <div class="card-body">
                <h5 class="card-title">Total Produk Reject</h5>
                <p class="card-text fs-3">{{ totalRejectQuantity }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th>ID Order</th>
                <th>Produk</th>
                <th>Jumlah Rencana</th>
                <th>Jumlah Aktual</th>
                <th>Jumlah Reject</th>
                <th>Tanggal Selesai</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="report in reports" :key="report.id">
                <td>{{ report.id }}</td>
                <td>{{ report.production_plan.product.product_name }}</td>
                <td>{{ report.production_plan.quantity }}</td>
                <td>{{ report.actual_quantity }}</td>
                <td>{{ report.reject_quantity }}</td>
                <td>{{ report.updated_at ? new Date(report.updated_at).toLocaleDateString() : 'N/A' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else-if="!loading" class="alert alert-info text-center">
        Tidak ada laporan produksi yang tersedia.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const reports = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchReports = async () => {
  loading.value = true;
  error.value = null;
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8000/api/production-orders/report', {
      headers: { Authorization: `Bearer ${token}` },
    });
    reports.value = response.data.orders;
  } catch (err) {
    console.error('Gagal memuat laporan:', err);
    error.value = 'Gagal memuat laporan produksi.';
  } finally {
    loading.value = false;
  }
};

const totalActualQuantity = computed(() => {
  return reports.value.reduce((sum, report) => sum + report.actual_quantity, 0);
});

const totalRejectQuantity = computed(() => {
  return reports.value.reduce((sum, report) => sum + report.reject_quantity, 0);
});

onMounted(() => {
  fetchReports();
});
</script>