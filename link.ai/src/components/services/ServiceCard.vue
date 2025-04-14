<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
    <router-link :to="`/service/${service.id}`">
      <div class="relative h-48 overflow-hidden">
        <img :src="service.image" :alt="service.title" class="w-full h-full object-cover" />
        <div class="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-md text-sm font-medium">
          ${{ service.price }}
        </div>
      </div>
    </router-link>
    
    <div class="p-4">
      <div class="flex items-center mb-3">
        <router-link :to="`/profile/${service.user.id}`" class="flex items-center">
          <img 
            :src="service.user.avatar" 
            :alt="service.user.name" 
            class="w-8 h-8 rounded-full object-cover mr-2"
          />
          <span class="text-sm text-secondary font-medium">{{ service.user.name }}</span>
        </router-link>
        <div class="ml-auto flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="text-xs text-secondary ml-1">{{ service.user.rating }}</span>
        </div>
      </div>
      
      <router-link :to="`/service/${service.id}`">
        <h3 class="text-lg font-semibold text-dark mb-2 line-clamp-2">{{ service.title }}</h3>
      </router-link>
      
      <p class="text-sm text-gray-600 mb-3 line-clamp-3">{{ service.description }}</p>
      
      <div class="flex justify-between items-center">
        <span class="text-xs px-2 py-1 bg-white rounded-full text-secondary">
          {{ service.category }}
        </span>
        <router-link :to="`/service/${service.id}`" class="text-primary text-sm font-medium hover:underline">
          View Details
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  service: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
