<script setup>
import { onMounted } from 'vue'
import { useUserStore } from './store/userStore'
import { useServicesStore } from './store/servicesStore'

const userStore = useUserStore()
const servicesStore = useServicesStore()

onMounted(() => {
  // Check if user is authenticated on app start
  userStore.checkAuth()

  // Fetch services for global access
  servicesStore.fetchServices()
})
</script>

<template>
  <router-view />
</template>

<style>
/* Global styles can be added here */
</style>
