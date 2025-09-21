<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
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
      <div class="collapse navbar-collapse" id="navbarNav" v-if="isLoggedIn">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-if="userRole === 'Manager' || userRole === 'Staff_PPIC'">
            <router-link class="nav-link" to="/products">
              <i class="bi bi-box-seam me-1"></i> Produk
            </router-link>
          </li>
          <li class="nav-item" v-if="userRole === 'Staff_PPIC'">
            <router-link class="nav-link" to="/rencana-produksi">
              <i class="bi bi-calendar-check me-1"></i> Rencana Produksi
            </router-link>
          </li>
          <li class="nav-item" v-if="userRole === 'Manager'">
            <router-link class="nav-link" to="/persetujuan-produksi">
              <i class="bi bi-check2-circle me-1"></i> Persetujuan
            </router-link>
          </li>
          <li class="nav-item" v-if="userRole === 'Staff_Produksi'">
            <router-link class="nav-link" to="/order-produksi">
              <i class="bi bi-cart-check me-1"></i> Order Produksi
            </router-link>
          </li>
          <li class="nav-item" v-if="userRole === 'Manager' || userRole === 'Staff_PPIC'">
            <router-link class="nav-link" to="/laporan-produksi">
              <i class="bi bi-clipboard-data me-1"></i> Laporan
            </router-link>
          </li>
          <li class="nav-item"
            v-if="userRole === 'Manager' || userRole === 'Staff_PPIC'"
          >
            <router-link class="nav-link" to="/inventaris">
              <i class="bi bi-box2-heart me-1"></i> Inventaris
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/log-produksi">
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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const userName = ref(localStorage.getItem("name") || "Pengguna");
const userRole = ref(localStorage.getItem("role") || "");
const token = ref(localStorage.getItem("token") || null);

// Reactive check
const isLoggedIn = computed(() => !!token.value);

const logout = () => {
  localStorage.clear();
  userName.value = "Pengguna";
  userRole.value = "";
  token.value = null;
  router.push({ name: "login" });
};
</script>

<style scoped>
/* Hover */
.navbar-nav .nav-link {
  transition: all 0.2s ease-in-out;
}
.navbar-nav .nav-link:hover {
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 6px;
}

/* Active (Vue Router auto add class) */
.router-link-active {
  font-weight: bold;
  color: #fff !important;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 6px;
}
</style>
