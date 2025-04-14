<template>
  <MainLayout>
    <div class="bg-white min-h-[70vh] flex items-center justify-center py-16">
      <div class="container-custom text-center">
        <div class="mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-dark mb-4">404</h1>
        <h2 class="text-2xl md:text-3xl font-semibold text-dark mb-6">Page Not Found</h2>
        <p class="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <router-link to="/" class="btn-primary">
            Go to Homepage
          </router-link>
          <button @click="goBack" class="btn-secondary">
            Go Back
          </button>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { useRouter } from 'vue-router'
import MainLayout from '../components/layout/MainLayout.vue'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>
