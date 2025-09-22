<template>
  <div class="container mt-4">
    <h2 class="mb-4 text-primary fw-bold">
      <i class="bi bi-cart-check me-2"></i> Order Produksi
    </h2>

    <!-- Loading -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2">Memuat order produksi...</p>
    </div>

    <!-- Error -->
    <div v-if="error" class="alert alert-danger text-center">
      <i class="bi bi-exclamation-triangle me-1"></i> {{ error }}
    </div>

    <!-- Table Order -->
    <div v-if="orders.length > 0" class="table-responsive">
      <table class="table table-hover table-bordered align-middle">
        <thead class="table-light">
          <tr>
            <th>ID Order</th>
            <th>Produk</th>
            <th>Jumlah</th>
            <th>Tanggal Target</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>#{{ order.id }}</td>
            <td>
              <i class="bi bi-box-seam text-primary me-1"></i>
              {{ order.production_plan.product.product_name }}
            </td>
            <td>{{ order.production_plan.quantity }}</td>
            <td>{{ order.target_completion_date }}</td>
            <td>
              <span
                class="badge py-2 px-3"
                :class="{
                  'bg-warning text-dark': order.status === 'menunggu',
                  'bg-primary text-white': order.status === 'sedang dikerjakan',
                  'bg-success': order.status === 'selesai',
                }"
              >
                {{ order.status }}
              </span>
            </td>
            <td>
              <div class="d-flex flex-wrap gap-2">
                <!-- Tombol Mulai -->
                <button
                  v-if="order.status === 'menunggu'"
                  @click="confirmStartOrder(order.id)"
                  class="btn btn-sm btn-warning"
                >
                  <i class="bi bi-play-fill me-1"></i> Mulai
                </button>

                <!-- Tombol Selesai -->
                <button
                  v-else-if="order.status === 'sedang dikerjakan'"
                  class="btn btn-sm btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#finishModal"
                  @click="setFinishOrder(order.id)"
                >
                  <i class="bi bi-check-lg me-1"></i> Selesai
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Jika kosong -->
    <div v-else-if="!loading" class="alert alert-info text-center">
      <i class="bi bi-info-circle me-1"></i> Tidak ada order produksi yang tersedia.
    </div>

    <!-- Modal Konfirmasi Mulai -->
    <div class="modal fade" id="startModal" tabindex="-1" aria-labelledby="startModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-warning text-dark">
            <h5 class="modal-title" id="startModalLabel">
              <i class="bi bi-play-fill me-1"></i> Konfirmasi Mulai Order
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Apakah Anda yakin ingin memulai order ini?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-warning" @click="executeStartOrder" data-bs-dismiss="modal">
              Mulai
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Selesaikan Order -->
    <div class="modal fade" id="finishModal" tabindex="-1" aria-labelledby="finishModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="finishOrder">
            <div class="modal-header bg-success text-white">
              <h5 class="modal-title" id="finishModalLabel">
                <i class="bi bi-check-circle me-1"></i> Selesaikan Order
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="actual_quantity" class="form-label">Jumlah Aktual</label>
                <input
                  type="number"
                  class="form-control"
                  id="actual_quantity"
                  v-model.number="finishForm.actual_quantity"
                  min="0"
                  required
                >
              </div>
              <div class="mb-3">
                <label for="reject_quantity" class="form-label">Jumlah Reject</label>
                <input
                  type="number"
                  class="form-control"
                  id="reject_quantity"
                  v-model.number="finishForm.reject_quantity"
                  min="0"
                  required
                >
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                <i class="bi bi-x-circle me-1"></i> Batal
              </button>
              <button type="submit" class="btn btn-success" data-bs-dismiss="modal">
                <i class="bi bi-check-lg me-1"></i> Selesai
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from "@/plugins/axios";

const orders = ref([]);
const loading = ref(true);
const error = ref(null);
const finishingOrderId = ref(null);
const startingOrderId = ref(null);
const finishForm = ref({ actual_quantity: 0, reject_quantity: 0 });

// Ambil daftar order
const fetchOrders = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('/api/production-orders', {
      headers: { Authorization: `Bearer ${token}` },
    });
    orders.value = response.data.orders.filter(order => ['menunggu','sedang dikerjakan'].includes(order.status));
  } catch (err) {
    console.error(err);
    error.value = 'Gagal memuat daftar order produksi.';
  } finally {
    loading.value = false;
  }
};

// Tombol Mulai
const confirmStartOrder = (id) => {
  startingOrderId.value = id;
  const modal = new bootstrap.Modal(document.getElementById('startModal'));
  modal.show();
};

const executeStartOrder = async () => {
  try {
    const token = localStorage.getItem('token');
    await axios.put(`/api/production-orders/${startingOrderId.value}/start`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchOrders();
    startingOrderId.value = null;
  } catch (err) {
    console.error(err);
    alert('Gagal memulai order. Silakan coba lagi.');
  }
};

// Tombol Selesai
const setFinishOrder = (id) => finishingOrderId.value = id;

const finishOrder = async () => {
  try {
    const token = localStorage.getItem('token');
    await axios.put(`/api/production-orders/${finishingOrderId.value}/finish`, finishForm.value, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchOrders();
    finishForm.value = { actual_quantity: 0, reject_quantity: 0 };
    finishingOrderId.value = null;
  } catch (err) {
    console.error(err);
    alert('Gagal menyelesaikan order. Silakan coba lagi.');
  }
};

onMounted(() => fetchOrders());
</script>
