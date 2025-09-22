<template>
  <div class="container mt-4">
    <h2 class="mb-4 text-primary fw-bold">
      <i class="bi bi-journal-text me-2"></i> Log Produksi
    </h2>

    <!-- Loading -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2">Memuat log...</p>
    </div>

    <!-- Error -->
    <div v-if="error" class="alert alert-danger text-center">
      <i class="bi bi-exclamation-triangle me-1"></i> {{ error }}
    </div>

    <!-- Tabel Log -->
    <div v-if="logs.length > 0" class="table-responsive shadow-sm">
      <table class="table table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th>No</th>
            <th>Waktu</th>
            <th>Order ID</th>
            <th>Produk</th>
            <th>Pengguna</th>
            <th>Status</th>
            <th>Catatan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(log, index) in logs" :key="log.id">
            <td>{{ index + 1 }}</td>
            <td>
              <i class="bi bi-clock me-1 text-muted"></i>
              {{ new Date(log.created_at).toLocaleString('id-ID') }}
            </td>
            <td>#{{ log.production_order_id }}</td>
            <td>
              <i class="bi bi-box-seam me-1 text-primary"></i>
              {{ log.production_order.production_plan.product.product_name }}
            </td>
            <td>
              <i class="bi bi-person-circle me-1 text-secondary"></i>
              {{ log.user.name }}
            </td>
            <td>
              <span
                class="badge px-3 py-2"
                :class="{
                  'bg-warning text-dark': log.status_change === 'sedang dikerjakan',
                  'bg-success': log.status_change === 'selesai'
                }"
              >
                <i
                  class="bi me-1"
                  :class="{
                    'bi-hourglass-split': log.status_change === 'sedang dikerjakan',
                    'bi-check-circle': log.status_change === 'selesai'
                  }"
                ></i>
                {{ log.status_change }}
              </span>
            </td>
            <td>{{ log.notes || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-else-if="!loading" class="alert alert-info text-center">
      <i class="bi bi-info-circle me-1"></i>
      Tidak ada log produksi yang tersedia.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from "@/plugins/axios";

const logs = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchLogs = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('/api/production-logs', {
      headers: { Authorization: `Bearer ${token}` },
    });
    logs.value = response.data.logs;
  } catch (err) {
    console.error('Gagal memuat log:', err);
    error.value = 'Gagal memuat daftar log produksi.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchLogs();
});
</script>
