<template>
  <div class="d-flex align-items-center justify-content-center vh-100 bg-gradient">
    <div class="card shadow-lg border-0 rounded-4" style="width: 400px">
      <div class="card-body p-4">
        <!-- Judul -->
        <h3 class="text-center mb-4 text-primary fw-bold">
          <i class="bi bi-box-arrow-in-right me-2"></i> Login
        </h3>

        <!-- Form -->
        <form @submit.prevent="login">
          <!-- Email -->
          <div class="mb-3">
            <label for="email" class="form-label fw-semibold">Email</label>
            <div class="input-group">
              <span class="input-group-text bg-light">
                <i class="bi bi-envelope-fill text-primary"></i>
              </span>
              <input
                v-model="email"
                type="email"
                class="form-control"
                id="email"
                placeholder="Masukkan email"
                required
              />
            </div>
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label for="password" class="form-label fw-semibold">Password</label>
            <div class="input-group">
              <span class="input-group-text bg-light">
                <i class="bi bi-lock-fill text-primary"></i>
              </span>
              <input
                v-model="password"
                type="password"
                class="form-control"
                id="password"
                placeholder="Masukkan password"
                required
              />
            </div>
          </div>

          <!-- Tombol Login -->
          <button
            type="submit"
            class="btn btn-primary w-100 fw-semibold shadow-sm"
          >
            <i class="bi bi-box-arrow-in-right me-1"></i> Login
          </button>

          <!-- Pesan Error -->
          <p v-if="error" class="text-danger mt-3 text-center fw-semibold">
            {{ error }}
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const login = async () => {
  try {
    const res = await axios.post("http://localhost:8000/api/login", {
      email: email.value,
      password: password.value,
    });

    const userData = res.data.user;

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("name", userData.name);
    localStorage.setItem("role", userData.role);
    localStorage.setItem("email", userData.email);
    router.push("/dashboard");
  } catch (err) {
    console.error(err);
    if (err.response && err.response.data && err.response.data.message) {
      error.value = err.response.data.message;
    } else {
      error.value = "Login gagal. Periksa kembali email dan password Anda.";
    }
  }
};
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}
.card {
  animation: fadeInUp 0.6s ease;
}
@keyframes fadeInUp {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
