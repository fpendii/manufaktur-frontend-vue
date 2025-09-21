<template>
  <div>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Persetujuan Rencana Produksi</h2>
      <div v-if="loading" class="text-center">Memuat rencana...</div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <div v-if="plans.length > 0" class="table-responsive">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID Rencana</th>
              <th>Produk</th>
              <th>Jumlah</th>
              <th>Tanggal Jatuh Tempo</th>
              <th>Dibuat Oleh</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="plan in plans" :key="plan.id">
              <td>{{ plan.id }}</td>
              <td>{{ plan.product.product_name }}</td>
              <td>{{ plan.quantity }}</td>
              <td>{{ plan.due_date }}</td>
              <td>{{ plan.user.name }}</td>
              <td>
                <span class="badge" :class="{
                  'bg-warning': plan.status === 'menunggu persetujuan',
                  'bg-success': plan.status === 'disetujui',
                  'bg-danger': plan.status === 'ditolak'
                }">
                  {{ plan.status }}
                </span>
              </td>
              <td>
                <div v-if="plan.status === 'menunggu persetujuan'">
                  <button @click="approvePlan(plan.id)" class="btn btn-success btn-sm me-2">
                    Setuju
                  </button>
                  <button @click="rejectPlan(plan.id)" class="btn btn-danger btn-sm">
                    Tolak
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else-if="!loading" class="alert alert-info text-center">
        Tidak ada rencana produksi yang menunggu persetujuan.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const plans = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchPlans = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8000/api/production-plans', {
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

const approvePlan = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:8000/api/production-plans/${id}/approve`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Muat ulang data setelah berhasil
    fetchPlans();
  } catch (err) {
    console.error('Gagal menyetujui rencana:', err);
    alert('Gagal menyetujui rencana. Silakan coba lagi.');
  }
};

const rejectPlan = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:8000/api/production-plans/${id}/reject`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Muat ulang data setelah berhasil
    fetchPlans();
  } catch (err) {
    console.error('Gagal menolak rencana:', err);
    alert('Gagal menolak rencana. Silakan coba lagi.');
  }
};

onMounted(() => {
  fetchPlans();
});
</script>