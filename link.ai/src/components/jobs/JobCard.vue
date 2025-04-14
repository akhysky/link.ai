<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
    <div class="p-6">
      <div class="flex items-center mb-4">
        <img 
          :src="job.company.logo" 
          :alt="job.company.name" 
          class="w-12 h-12 rounded-md object-cover mr-3"
        />
        <div>
          <router-link :to="`/company/${job.company.id}`" class="text-sm text-secondary hover:text-primary transition-colors">
            {{ job.company.name }}
          </router-link>
          <div class="text-xs text-gray-500">{{ job.company.location }}</div>
        </div>
        <div class="ml-auto">
          <span class="text-xs px-2 py-1 bg-white rounded-full text-secondary">
            {{ job.category }}
          </span>
        </div>
      </div>
      
      <router-link :to="`/job/${job.id}`">
        <h3 class="text-lg font-semibold text-dark mb-2 line-clamp-2">{{ job.title }}</h3>
      </router-link>
      
      <p class="text-sm text-gray-600 mb-4 line-clamp-3">{{ job.description }}</p>
      
      <div class="flex flex-wrap gap-2 mb-4">
        <span class="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
          Budget: ${{ job.budget }}
        </span>
        <span class="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">
          Duration: {{ job.duration }}
        </span>
        <span class="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded-full">
          {{ job.applications }} applications
        </span>
      </div>
      
      <div class="flex justify-between items-center">
        <span class="text-xs text-gray-500">Posted: {{ formatDate(job.postedDate) }}</span>
        <router-link :to="`/job/${job.id}`" class="text-primary text-sm font-medium hover:underline">
          View Details
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  job: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
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
