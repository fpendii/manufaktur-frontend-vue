<template>
  <div>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Log Produksi</h2>
      <div v-if="loading" class="text-center">Memuat log...</div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <div v-if="logs.length > 0" class="table-responsive">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Waktu</th>
              <th>Order ID</th>
              <th>Produk</th>
              <th>Pengguna</th>
              <th>Perubahan Status</th>
              <th>Catatan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in logs" :key="log.id">
              <td>{{ new Date(log.created_at).toLocaleString() }}</td>
              <td>{{ log.production_order_id }}</td>
              <td>{{ log.production_order.production_plan.product.product_name }}</td>
              <td>{{ log.user.name }}</td>
              <td>
                <span class="badge" :class="{
                  'bg-warning text-dark': log.status_change === 'sedang dikerjakan',
                  'bg-success': log.status_change === 'selesai'
                }">
                  {{ log.status_change }}
                </span>
              </td>
              <td>{{ log.notes }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else-if="!loading" class="alert alert-info text-center">
        Tidak ada log produksi yang tersedia.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const logs = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchLogs = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8000/api/production-logs', {
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