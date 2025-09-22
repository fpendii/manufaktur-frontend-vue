<template>
  <div class="container mt-4">
    <h2 class=" mb-4 text-primary fw-bold">
      <i class="bi bi-journal-check me-2"></i> Laporan Produksi Selesai
    </h2>

    <!-- Loading -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2">Memuat laporan...</p>
    </div>

    <!-- Error -->
    <div v-if="error" class="alert alert-danger text-center">
      <i class="bi bi-exclamation-triangle me-1"></i> {{ error }}
    </div>

    <!-- Card Summary -->
    <div v-if="reports.length > 0" class="row mb-4">
      <div class="col-md-6 mb-3">
        <div class="card shadow-sm border-0 text-white bg-success h-100">
          <div class="card-body d-flex align-items-center">
            <i class="bi bi-check-circle-fill fs-1 me-3"></i>
            <div>
              <h6 class="card-title">Total Produk Selesai</h6>
              <p class="card-text fs-3 mb-0">{{ totalActualQuantity }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-3">
        <div class="card shadow-sm border-0 text-white bg-danger h-100">
          <div class="card-body d-flex align-items-center">
            <i class="bi bi-x-circle-fill fs-1 me-3"></i>
            <div>
              <h6 class="card-title">Total Produk Reject</h6>
              <p class="card-text fs-3 mb-0">{{ totalRejectQuantity }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table Laporan -->
    <div v-if="reports.length > 0" class="table-responsive shadow-sm">
      <table class="table table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th>No</th>
            <th>Produk</th>
            <th class="text-center">Jumlah Rencana</th>
            <th class="text-center">Jumlah Aktual</th>
            <th class="text-center">Jumlah Reject</th>
            <th>Tanggal Selesai</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(report, index) in reports" :key="report.id">
            <td>{{ index + 1 }}</td>
            <td>
              <i class="bi bi-box-seam me-1 text-primary"></i>
              {{ report.production_plan.product.product_name }}
            </td>
            <td class="text-center">{{ report.production_plan.quantity }}</td>
            <td class="text-center">{{ report.actual_quantity }}</td>
            <td class="text-center">
              <span class="badge bg-danger">{{ report.reject_quantity }}</span>
            </td>
            <td>
              <i class="bi bi-calendar-event me-1 text-muted"></i>
              {{ report.updated_at ? new Date(report.updated_at).toLocaleDateString('id-ID') : 'N/A' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-else-if="!loading" class="alert alert-info text-center">
      <i class="bi bi-info-circle me-1"></i>
      Tidak ada laporan produksi yang tersedia.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from "@/plugins/axios";

const reports = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchReports = async () => {
  loading.value = true;
  error.value = null;
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('/api/production-orders/report', {
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

const totalActualQuantity = computed(() => reports.value.reduce((sum, r) => sum + r.actual_quantity, 0));
const totalRejectQuantity = computed(() => reports.value.reduce((sum, r) => sum + r.reject_quantity, 0));

onMounted(() => {
  fetchReports();
});
</script>
