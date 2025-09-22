<template>
  <div class="dashboard-page">
    <!-- Header -->
    <div class="dashboard-header shadow-sm mb-4">
      <h2 class="fw-bold">Dashboard Utama</h2>
      <p class="mb-0">Selamat datang kembali, <strong>{{ userName }}</strong> 👋</p>
    </div>

    <!-- Informasi Akun -->
    <div class="card shadow-sm border-0 mb-4">
      <div class="card-body">
        <h5 class="card-title text-primary">
          <i class="bi bi-person-circle me-2"></i> Informasi Akun
        </h5>
        <p><strong>Nama:</strong> {{ userName }}</p>
        <p><strong>Email:</strong> {{ userEmail }}</p>
        <p><strong>Peran:</strong> {{ userRole }}</p>
      </div>
    </div>

    
  </div>
</template>

<script setup>
import { ref } from "vue";

const userName = ref(localStorage.getItem("name") || "Pengguna");
const userEmail = ref(localStorage.getItem("email") || "");
const userRole = ref(localStorage.getItem("role") || "");

const quickMenu = [
  { title: "Produk", desc: "Kelola data produk", icon: "bi bi-box-seam", color: "primary" },
  { title: "Rencana Produksi", desc: "Atur jadwal produksi", icon: "bi bi-calendar-check", color: "success" },
  { title: "Laporan", desc: "Lihat laporan hasil", icon: "bi bi-clipboard-data", color: "warning" },
];
</script>

<style scoped>
.dashboard-page {
  background: #f1f5f9;
  min-height: 100vh;
  padding: 20px;
}
.dashboard-header {
  background: linear-gradient(135deg, #1e293b, #2563eb);
  color: white;
  border-radius: 12px;
  padding: 30px;
}
.section-title {
  font-size: 14px;
  font-weight: bold;
  color: #64748b;
  margin-bottom: 15px;
}
.hover-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}
</style>
