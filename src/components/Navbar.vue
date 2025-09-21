<template>
  <!-- Navbar hanya tampil jika login -->
  <nav
    v-if="isLoggedIn"
    class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm"
  >
    <div class="container-fluid">
      <!-- Brand -->
      <router-link class="navbar-brand d-flex align-items-center" to="/dashboard">
        <i class="bi bi-gear-fill me-2"></i>
        <span class="fw-bold">Manufaktur App</span>
      </router-link>

      <!-- Toggler -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menu -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-if="userRole === 'Manager' || userRole === 'Staff_PPIC'">
  <router-link class="nav-link" to="/products" active-class="active">
    <i class="bi bi-box-seam me-1"></i> Produk
  </router-link>
</li>

<li class="nav-item" v-if="userRole === 'Staff_PPIC'">
  <router-link class="nav-link" to="/rencana-produksi" active-class="active">
    <i class="bi bi-calendar-check me-1"></i> Rencana Produksi
  </router-link>
</li>

<li class="nav-item" v-if="userRole === 'Manager'">
  <router-link class="nav-link" to="/persetujuan-produksi" active-class="active">
    <i class="bi bi-check2-circle me-1"></i> Persetujuan
  </router-link>
</li>

<li class="nav-item" v-if="userRole === 'Staff_Produksi'">
  <router-link class="nav-link" to="/order-produksi" active-class="active">
    <i class="bi bi-cart-check me-1"></i> Order Produksi
  </router-link>
</li>

<li class="nav-item" v-if="userRole === 'Manager' || userRole === 'Staff_PPIC'">
  <router-link class="nav-link" to="/laporan-produksi" active-class="active">
    <i class="bi bi-clipboard-data me-1"></i> Laporan
  </router-link>
</li>

<li class="nav-item" v-if="userRole === 'Manager' || userRole === 'Staff_PPIC'">
  <router-link class="nav-link" to="/inventaris" active-class="active">
    <i class="bi bi-box2-heart me-1"></i> Inventaris
  </router-link>
</li>

<li class="nav-item">
  <router-link class="nav-link" to="/log-produksi" active-class="active">
    <i class="bi bi-journal-text me-1"></i> Log Produksi
  </router-link>
</li>

        </ul>

        <!-- User Info -->
        <ul class="navbar-nav ms-auto">
          <li class="nav-item d-flex align-items-center text-white me-2">
            <i class="bi bi-person-circle me-1"></i>
            Halo, {{ userName }}
          </li>
          <li class="nav-item">
            <button @click="logout" class="btn btn-light btn-sm ms-2">
              <i class="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const userName = ref("Pengguna");
const userRole = ref("");
const token = ref(null);

const isLoggedIn = computed(() => !!token.value);

// Sync dari localStorage saat mount
const syncAuth = () => {
  token.value = localStorage.getItem("token") || null;
  userName.value = localStorage.getItem("name") || "Pengguna";
  userRole.value = localStorage.getItem("role") || "";
};

onMounted(() => {
  syncAuth();
});

// Re-sync setiap kali route berubah
watch(
  () => route.fullPath,
  () => {
    syncAuth();
  }
);

const logout = () => {
  localStorage.clear();
  syncAuth();
  router.push({ name: "login" });
};
</script>
