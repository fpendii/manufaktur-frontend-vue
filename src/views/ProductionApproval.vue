<template>
  <div class="container mt-4">
    <!-- Header -->
    <div class="text d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold text-primary">
        <i class="bi bi-clipboard-check me-2"></i> Persetujuan Rencana Produksi
      </h2>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2">Memuat rencana produksi...</p>
    </div>

    <!-- Error -->
    <div v-if="error" class="alert alert-danger">
      <i class="bi bi-exclamation-triangle me-1"></i> {{ error }}
    </div>

    <!-- Data Tabel -->
    <div v-if="plans.length > 0" class="card shadow-sm border-0">
      <div class="card-body">
        <table class="table table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th>ID Rencana</th>
              <th>Produk</th>
              <th class="text-center">Jumlah</th>
              <th>Tanggal Jatuh Tempo</th>
              <th>Dibuat Oleh</th>
              <th>Status</th>
              <th class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
             <tr v-for="(plan, index) in plans" :key="plan.id">
    <!-- Nomor urut -->
    <td>{{ index + 1 }}</td>
              <td class="fw-medium">
                <i class="bi bi-box-seam text-primary me-1"></i>
                {{ plan.product.product_name }}
              </td>
              <td class="text-center">{{ plan.quantity }}</td>
              <td>
                <i class="bi bi-calendar-event me-1 text-muted"></i>
                {{ plan.due_date }}
              </td>
              <td>
                <i class="bi bi-person-circle me-1 text-secondary"></i>
                {{ plan.user.name }}
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
                    class="bi"
                    :class="{
                      'bi-hourglass-split': plan.status === 'menunggu persetujuan',
                      'bi-check-circle': plan.status === 'disetujui',
                      'bi-x-circle': plan.status === 'ditolak'
                    }"
                  ></i>
                  {{ plan.status }}
                </span>
              </td>
              <td class="text-center">
                <div v-if="plan.status === 'menunggu persetujuan'">
                  <button
                    @click="approvePlan(plan.id)"
                    class="btn btn-sm btn-success me-2"
                  >
                    <i class="bi bi-check-lg"></i>
                  </button>
                  <button
                    @click="rejectPlan(plan.id)"
                    class="btn btn-sm btn-danger"
                  >
                    <i class="bi bi-x-lg"></i>
                  </button>
                </div>
                <div v-else class="text-muted">-</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Jika kosong -->
    <div v-else-if="!loading" class="alert alert-info text-center">
      <i class="bi bi-info-circle me-1"></i>
      Tidak ada rencana produksi yang menunggu persetujuan.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/plugins/axios";

const plans = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchPlans = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/production-plans", {
      headers: { Authorization: `Bearer ${token}` },
    });
    plans.value = response.data.plans.filter(
      (plan) => plan.status === "menunggu persetujuan"
    );
  } catch (err) {
    console.error("Gagal memuat rencana:", err);
    error.value = "Gagal memuat daftar rencana produksi.";
  } finally {
    loading.value = false;
  }
};

const approvePlan = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await axios.put(`/api/production-plans/${id}/approve`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchPlans();
  } catch (err) {
    console.error("Gagal menyetujui rencana:", err);
    alert("Gagal menyetujui rencana. Silakan coba lagi.");
  }
};

const rejectPlan = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await axios.put(`/api/production-plans/${id}/reject`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchPlans();
  } catch (err) {
    console.error("Gagal menolak rencana:", err);
    alert("Gagal menolak rencana. Silakan coba lagi.");
  }
};

onMounted(() => {
  fetchPlans();
});
</script>
