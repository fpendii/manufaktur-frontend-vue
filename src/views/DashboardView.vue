<template>
  <div>
    <div class="container mt-5">
      <div class="card shadow text-center mx-auto" style="max-width: 600px;">
        <div class="card-body">
          <h2 class="card-title">Dashboard Utama</h2>
          <p class="card-text">Selamat datang kembali, {{ userName }}!</p>
          
          <div class="card mt-4">
            <div class="card-body text-start">
              <h5 class="card-title">Informasi Akun</h5>
              <p class="mb-1"><strong>Nama:</strong> {{ userName }}</p>
              <p class="mb-1"><strong>Email:</strong> {{ userEmail }}</p>
              <p class="mb-1"><strong>Peran:</strong> {{ userRole }}</p>
            </div>
          </div>

          
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';

const userName = ref(localStorage.getItem('name') || 'Pengguna');
const userEmail = ref(localStorage.getItem('email') || '');
const userRole = ref(localStorage.getItem('role') || '');
</script>

<style scoped>
/* Tambahkan gaya khusus di sini jika diperlukan */
</style>