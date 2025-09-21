<template>
  <div class="d-flex align-items-center justify-content-center vh-100 bg-light">
    <div class="card shadow" style="width: 400px">
      <div class="card-body">
        <h3 class="text-center mb-4">Login</h3>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="email"
              placeholder="Masukkan email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Masukkan password"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
          <p v-if="error" class="text-danger mt-3">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const login = async () => {
  try {
    const res = await axios.post('http://localhost:8000/api/login', {
      email: email.value,
      password: password.value,
    });

    const userData = res.data.user;

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('name', userData.name);
    localStorage.setItem('role', userData.role); // Peran disimpan sesuai dari DB
    localStorage.setItem('email', userData.email);
    router.push('/dashboard');
  } catch (err) {
    console.error(err);
    if (err.response && err.response.data && err.response.data.message) {
      error.value = err.response.data.message;
    } else {
      error.value = 'Login gagal. Periksa kembali email dan password Anda.';
    }
  }
};
</script>

<style scoped>
/* Tambahkan gaya khusus di sini jika diperlukan */
</style>