<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue' // Impor komponen Navbar
</script>

<template>
  <div>
    <Navbar /> <RouterView />
  </div>
</template>