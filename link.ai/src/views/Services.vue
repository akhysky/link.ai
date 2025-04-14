<template>
  <MainLayout>
    <div class="bg-white py-8">
      <div class="container-custom">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Sidebar Filters -->
          <div class="w-full md:w-1/4">
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h2 class="text-xl font-semibold mb-4">Filtres</h2>

              <!-- Category Filter -->
              <div class="mb-6">
                <h3 class="font-medium mb-2">Catégorie</h3>
                <div class="space-y-2">
                  <div
                    v-for="(category, index) in categories"
                    :key="index"
                    class="flex items-center"
                  >
                    <input
                      type="checkbox"
                      :id="`category-${index}`"
                      :value="category"
                      v-model="selectedCategories"
                      class="mr-2"
                    />
                    <label :for="`category-${index}`" class="text-gray-700">{{ category }}</label>
                  </div>
                </div>
              </div>

              <!-- Price Range Filter -->
              <div class="mb-6">
                <h3 class="font-medium mb-2">Fourchette de prix</h3>
                <div class="flex items-center">
                  <input
                    type="number"
                    placeholder="Min"
                    v-model="priceMin"
                    class="w-1/2 p-2 border border-gray-300 rounded-md mr-2"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    v-model="priceMax"
                    class="w-1/2 p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <!-- Apply Filters Button -->
              <button
                @click="applyFilters"
                class="w-full btn-primary"
              >
                Appliquer les filtres
              </button>
            </div>
          </div>

          <!-- Services List -->
          <div class="w-full md:w-3/4">
            <div class="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
                <h1 class="text-2xl font-bold mb-4 md:mb-0">
                  {{ pageTitle }}
                </h1>
                <div class="flex items-center">
                  <label class="mr-2 text-gray-700">Trier par :</label>
                  <select
                    v-model="sortBy"
                    class="p-2 border border-gray-300 rounded-md"
                    @change="applyFilters"
                  >
                    <option value="relevance">Pertinence</option>
                    <option value="price_low">Prix : Croissant</option>
                    <option value="price_high">Prix : Décroissant</option>
                    <option value="rating">Évaluation</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center py-10">
              <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>

            <!-- No Results -->
            <div v-else-if="filteredServices.length === 0" class="bg-white p-10 rounded-lg shadow-sm text-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="text-xl font-semibold mb-2">Aucun service trouvé</h3>
              <p class="text-gray-600 mb-4">Essayez d'ajuster vos filtres ou vos critères de recherche</p>
              <button @click="resetFilters" class="btn-primary">
                Réinitialiser les filtres
              </button>
            </div>

            <!-- Services Grid -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ServiceCard
                v-for="service in filteredServices"
                :key="service.id"
                :service="service"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MainLayout from '../components/layout/MainLayout.vue'
import ServiceCard from '../components/services/ServiceCard.vue'
import { useServicesStore } from '../store/servicesStore'

const route = useRoute()
const router = useRouter()
const servicesStore = useServicesStore()

// State
const selectedCategories = ref([])
const priceMin = ref('')
const priceMax = ref('')
const sortBy = ref('relevance')

// Computed
const loading = computed(() => servicesStore.loading)
const services = computed(() => servicesStore.getAllServices)
const categories = computed(() => servicesStore.getCategories)

const pageTitle = computed(() => {
  if (route.query.search) {
    return `Résultats de recherche pour "${route.query.search}"`
  } else if (route.query.category) {
    return `Services ${route.query.category}`
  } else {
    return 'Tous les services IA'
  }
})

const filteredServices = computed(() => {
  let result = [...services.value]

  // Apply category filter
  if (selectedCategories.value.length > 0) {
    result = result.filter(service =>
      selectedCategories.value.includes(service.category)
    )
  }

  // Apply price filter
  if (priceMin.value) {
    result = result.filter(service => service.price >= Number(priceMin.value))
  }

  if (priceMax.value) {
    result = result.filter(service => service.price <= Number(priceMax.value))
  }

  // Apply sorting
  switch (sortBy.value) {
    case 'price_low':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price_high':
      result.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      result.sort((a, b) => b.user.rating - a.user.rating)
      break
    default:
      // Default sorting (relevance) - no change
      break
  }

  return result
})

// Methods
const applyFilters = () => {
  const query = { ...route.query }

  if (selectedCategories.value.length > 0) {
    query.categories = selectedCategories.value.join(',')
  } else {
    delete query.categories
  }

  if (priceMin.value) {
    query.min = priceMin.value
  } else {
    delete query.min
  }

  if (priceMax.value) {
    query.max = priceMax.value
  } else {
    delete query.max
  }

  if (sortBy.value !== 'relevance') {
    query.sort = sortBy.value
  } else {
    delete query.sort
  }

  router.push({ query })
}

const resetFilters = () => {
  selectedCategories.value = []
  priceMin.value = ''
  priceMax.value = ''
  sortBy.value = 'relevance'

  const query = { ...route.query }
  delete query.categories
  delete query.min
  delete query.max
  delete query.sort

  router.push({ query })
}

// Lifecycle
onMounted(() => {
  servicesStore.fetchServices()

  // Initialize filters from URL query params
  if (route.query.category) {
    selectedCategories.value = [route.query.category]
  } else if (route.query.categories) {
    selectedCategories.value = route.query.categories.split(',')
  }

  if (route.query.min) {
    priceMin.value = route.query.min
  }

  if (route.query.max) {
    priceMax.value = route.query.max
  }

  if (route.query.sort) {
    sortBy.value = route.query.sort
  }

  if (route.query.search) {
    servicesStore.searchServices(route.query.search)
  }
})

// Watch for query changes
watch(() => route.query, (newQuery) => {
  if (newQuery.search && newQuery.search !== route.query.search) {
    servicesStore.searchServices(newQuery.search)
  }

  if (newQuery.category && newQuery.category !== route.query.category) {
    selectedCategories.value = [newQuery.category]
  }
}, { deep: true })
</script>
