<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main content -->
    <div class="flex-grow-1 p-3">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/Navbar.vue";
</script>
