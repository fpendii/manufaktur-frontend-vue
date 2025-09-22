<template>
  <!-- Sidebar hanya tampil jika login -->
  <div v-if="isLoggedIn" class="d-flex">
    <!-- Sidebar -->
    <div
      id="sidebar"
      class="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white"
      style="width: 250px; min-height: 100vh"
    >
      <!-- Brand -->
      <router-link
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        to="/dashboard"
      >
        <img src="@/assets/logo.png" alt="Logo" style="height: 30px" />
      </router-link>

      <hr />

      <!-- Menu -->
      <ul class="nav nav-pills flex-column mb-auto">
        <li
          class="nav-item"
         
        >
          <router-link
            class="nav-link text-white"
            to="/dashboard"
            active-class="active"
          >
            <i class="bi bi-speedometer2 me-2"></i> dashboard
          </router-link>
        </li>
        <li
          class="nav-item"
          v-if="userRole === 'Manager' || userRole === 'Staff_PPIC'"
        >
          <router-link
            class="nav-link text-white"
            to="/products"
            active-class="active"
          >
            <i class="bi bi-box-seam me-2"></i> Produk
          </router-link>
        </li>

        <li v-if="userRole === 'Staff_PPIC'">
          <router-link
            class="nav-link text-white"
            to="/rencana-produksi"
            active-class="active"
          >
            <i class="bi bi-calendar-check me-2"></i> Rencana Produksi
          </router-link>
        </li>

        <li v-if="userRole === 'Manager'">
          <router-link
            class="nav-link text-white"
            to="/persetujuan-produksi"
            active-class="active"
          >
            <i class="bi bi-check2-circle me-2"></i> Persetujuan
          </router-link>
        </li>

        <li v-if="userRole === 'Staff_Produksi'">
          <router-link
            class="nav-link text-white"
            to="/order-produksi"
            active-class="active"
          >
            <i class="bi bi-cart-check me-2"></i> Order Produksi
          </router-link>
        </li>

        <li v-if="userRole === 'Manager' || userRole === 'Staff_PPIC'">
          <router-link
            class="nav-link text-white"
            to="/laporan-produksi"
            active-class="active"
          >
            <i class="bi bi-clipboard-data me-2"></i> Laporan
          </router-link>
        </li>

        <li v-if="userRole === 'Manager' || userRole === 'Staff_PPIC'">
          <router-link
            class="nav-link text-white"
            to="/inventaris"
            active-class="active"
          >
            <i class="bi bi-box2-heart me-2"></i> Inventaris
          </router-link>
        </li>

        <li>
          <router-link
            class="nav-link text-white"
            to="/log-produksi"
            active-class="active"
          >
            <i class="bi bi-journal-text me-2"></i> Log Produksi
          </router-link>
        </li>
        <hr />
        <li>
          <button class="btn btn-danger w-100 text-start mt-1" @click="logout">
            <i class="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </li>
      </ul>
      <hr />

      <!-- User Info -->
      <div class="dropdown">
        <a
          href="#"
          class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="bi bi-person-circle me-2"></i>
          <strong>{{ userName }}</strong>
        </a>
        <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
          <li>
            <button class="dropdown-item" @click="logout">
              <i class="bi bi-box-arrow-right me-2"></i> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>


  </div>
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
