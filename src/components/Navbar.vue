<template>
  <nav
    v-if="isLoggedIn"
    class="navbar navbar-expand-lg navbar-dark bg-dark"
  >
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/dashboard">
        Manufaktur App
      </router-link>
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
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li
            class="nav-item"
            v-if="userRole === 'Manager' || userRole === 'Staff_PPIC'"
          >
            <router-link class="nav-link" to="/products">Produk</router-link>
          </li>
          <li class="nav-item" v-if="userRole === 'Staff_PPIC'">
            <router-link class="nav-link" to="/rencana-produksi"
              >Rencana Produksi</router-link
            >
          </li>
          <li class="nav-item" v-if="userRole === 'Manager'">
            <router-link class="nav-link" to="/persetujuan-produksi"
              >Persetujuan</router-link
            >
          </li>
          <li class="nav-item" v-if="userRole === 'Staff_Produksi'">
            <router-link class="nav-link" to="/order-produksi"
              >Order Produksi</router-link
            >
          </li>
          <li
            class="nav-item"
            v-if="userRole === 'Manager' || userRole === 'Staff_PPIC'"
          >
            <router-link class="nav-link" to="/laporan-produksi"
              >Laporan Produksi</router-link
            >
          </li>
          <li class="nav-item"
            v-if="userRole === 'Manager' || userRole === 'Staff_PPIC'"
          >
            <router-link class="nav-link" to="/inventaris"
              >Inventaris</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/log-produksi"
              >Log Produksi</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <span class="nav-link text-white"
              >Halo, {{ userName }}! ({{ userRole }})</span
            >
          </li>
          <li class="nav-item">
            <button @click="logout" class="btn btn-outline-light ms-2">
              Logout
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

// reactive check
const isLoggedIn = computed(() => !!token.value);

const logout = () => {
  localStorage.clear();
  userName.value = "Pengguna";
  userRole.value = "";
  token.value = null; // update ref biar reactive
  router.push({ name: "login" });
};
</script>
