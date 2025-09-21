<template>
  <div>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Order Produksi</h2>
      <div v-if="loading" class="text-center">Memuat order...</div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <div v-if="orders.length > 0" class="table-responsive">
        <table class="table table-striped table-bordered">
          <thead>
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
              <td>{{ order.id }}</td>
              <td>{{ order.production_plan.product.product_name }}</td>
              <td>{{ order.production_plan.quantity }}</td>
              <td>{{ order.target_completion_date }}</td>
              <td>
                <span class="badge" :class="{
                  'bg-warning text-dark': order.status === 'menunggu',
                  'bg-primary': order.status === 'sedang dikerjakan',
                  'bg-success': order.status === 'selesai',
                }">
                  {{ order.status }}
                </span>
              </td>
              <td>
                <div v-if="order.status === 'menunggu'">
                  <button @click="startOrder(order.id)" class="btn btn-warning btn-sm me-2">
                    Mulai
                  </button>
                </div>
                <div v-else-if="order.status === 'sedang dikerjakan'">
                  <button
                    class="btn btn-success btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#finishModal"
                    @click="setFinishOrder(order.id)"
                  >
                    Selesai
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else-if="!loading" class="alert alert-info text-center">
        Tidak ada order produksi yang tersedia.
      </div>
    </div>

    <div class="modal fade" id="finishModal" tabindex="-1" aria-labelledby="finishModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="finishOrder">
            <div class="modal-header">
              <h5 class="modal-title" id="finishModalLabel">Selesaikan Order</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="actual_quantity" class="form-label">Jumlah Aktual</label>
                <input type="number" class="form-control" id="actual_quantity" v-model.number="finishForm.actual_quantity" required>
              </div>
              <div class="mb-3">
                <label for="reject_quantity" class="form-label">Jumlah Reject</label>
                <input type="number" class="form-control" id="reject_quantity" v-model.number="finishForm.reject_quantity" required>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Selesai</button>
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
const finishForm = ref({
  actual_quantity: 0,
  reject_quantity: 0,
});

const fetchOrders = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8000/api/production-orders', {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Filter untuk menampilkan hanya order yang menunggu atau sedang dikerjakan
    orders.value = response.data.orders.filter(order => ['menunggu', 'sedang dikerjakan'].includes(order.status));
  } catch (err) {
    console.error('Gagal memuat order:', err);
    error.value = 'Gagal memuat daftar order produksi.';
  } finally {
    loading.value = false;
  }
};

const startOrder = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.put(`/api/production-orders/${id}/start`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchOrders(); // Muat ulang data
  } catch (err) {
    console.error('Gagal memulai order:', err.response);
    // Tambahkan alert jika gagal, karena Anda sudah menghapusnya
    alert('Gagal memulai order. Silakan coba lagi.');
  }
};

const setFinishOrder = (id) => {
  finishingOrderId.value = id;
};

const finishOrder = async () => {
  try {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:8000/api/production-orders/${finishingOrderId.value}/finish`, finishForm.value, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchOrders(); // Muat ulang data
    finishForm.value = { actual_quantity: 0, reject_quantity: 0 }; // Reset form
    finishingOrderId.value = null;
  } catch (err) {
    console.error('Gagal menyelesaikan order:', err.response);
    alert('Gagal menyelesaikan order. Silakan coba lagi.');
  }
};

onMounted(() => {
  fetchOrders();
});
</script>