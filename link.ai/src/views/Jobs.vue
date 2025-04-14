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

              <!-- Budget Range Filter -->
              <div class="mb-6">
                <h3 class="font-medium mb-2">Fourchette de budget</h3>
                <div class="flex items-center">
                  <input
                    type="number"
                    placeholder="Min"
                    v-model="budgetMin"
                    class="w-1/2 p-2 border border-gray-300 rounded-md mr-2"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    v-model="budgetMax"
                    class="w-1/2 p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <!-- Duration Filter -->
              <div class="mb-6">
                <h3 class="font-medium mb-2">Durée</h3>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="duration-short"
                      value="short"
                      v-model="selectedDurations"
                      class="mr-2"
                    />
                    <label for="duration-short" class="text-gray-700">Moins d'1 mois</label>
                  </div>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="duration-medium"
                      value="medium"
                      v-model="selectedDurations"
                      class="mr-2"
                    />
                    <label for="duration-medium" class="text-gray-700">1-3 mois</label>
                  </div>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="duration-long"
                      value="long"
                      v-model="selectedDurations"
                      class="mr-2"
                    />
                    <label for="duration-long" class="text-gray-700">3+ mois</label>
                  </div>
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

          <!-- Jobs List -->
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
                    <option value="recent">Plus récents</option>
                    <option value="budget_high">Budget : Décroissant</option>
                    <option value="budget_low">Budget : Croissant</option>
                    <option value="applications">Moins de candidatures</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Post a Job Button (for companies) -->
            <div v-if="isCompany" class="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div class="flex justify-between items-center">
                <p class="text-gray-700">Vous recherchez des talents en IA pour votre projet ?</p>
                <router-link to="/post-job" class="btn-primary">
                  Publier une offre
                </router-link>
              </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center py-10">
              <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>

            <!-- No Results -->
            <div v-else-if="filteredJobs.length === 0" class="bg-white p-10 rounded-lg shadow-sm text-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="text-xl font-semibold mb-2">Aucune offre trouvée</h3>
              <p class="text-gray-600 mb-4">Essayez d'ajuster vos filtres ou vos critères de recherche</p>
              <button @click="resetFilters" class="btn-primary">
                Réinitialiser les filtres
              </button>
            </div>

            <!-- Jobs Grid -->
            <div v-else class="space-y-6">
              <JobCard
                v-for="job in filteredJobs"
                :key="job.id"
                :job="job"
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
import JobCard from '../components/jobs/JobCard.vue'
import { useJobsStore } from '../store/jobsStore'
import { useUserStore } from '../store/userStore'
import { useServicesStore } from '../store/servicesStore'

const route = useRoute()
const router = useRouter()
const jobsStore = useJobsStore()
const userStore = useUserStore()
const servicesStore = useServicesStore()

// State
const selectedCategories = ref([])
const budgetMin = ref('')
const budgetMax = ref('')
const selectedDurations = ref([])
const sortBy = ref('recent')

// Computed
const loading = computed(() => jobsStore.loading)
const jobs = computed(() => jobsStore.getAllJobs)
const categories = computed(() => servicesStore.getCategories)
const isLoggedIn = computed(() => userStore.isLoggedIn)
const user = computed(() => userStore.getUser)
const isCompany = computed(() => user.value?.accountType === 'client')
const isFreelancer = computed(() => user.value?.accountType === 'freelancer')

const pageTitle = computed(() => {
  if (route.query.search) {
    return `Résultats de recherche pour "${route.query.search}"`
  } else if (route.query.category) {
    return `Offres ${route.query.category}`
  } else {
    return 'Offres d\'emploi IA'
  }
})

const filteredJobs = computed(() => {
  let result = [...jobs.value]

  // Apply category filter
  if (selectedCategories.value.length > 0) {
    result = result.filter(job =>
      selectedCategories.value.includes(job.category)
    )
  }

  // Apply budget filter
  if (budgetMin.value) {
    result = result.filter(job => {
      const minBudget = parseInt(job.budget.split('-')[0].replace(/\D/g, ''))
      return minBudget >= Number(budgetMin.value)
    })
  }

  if (budgetMax.value) {
    result = result.filter(job => {
      const maxBudget = parseInt(job.budget.split('-')[1]?.replace(/\D/g, '') || job.budget.replace(/\D/g, ''))
      return maxBudget <= Number(budgetMax.value)
    })
  }

  // Apply duration filter
  if (selectedDurations.value.length > 0) {
    result = result.filter(job => {
      const duration = job.duration.toLowerCase()
      if (selectedDurations.value.includes('short') && (duration.includes('less than 1 month') || duration.includes('moins d\'1 mois'))) return true
      if (selectedDurations.value.includes('medium') && (duration.includes('1-3 months') || duration.includes('1-3 mois'))) return true
      if (selectedDurations.value.includes('long') && (duration.includes('3+') || duration.includes('3+ mois'))) return true
      return false
    })
  }

  // Apply sorting
  switch (sortBy.value) {
    case 'budget_high':
      result.sort((a, b) => {
        const maxBudgetA = parseInt(a.budget.split('-')[1]?.replace(/\D/g, '') || a.budget.replace(/\D/g, ''))
        const maxBudgetB = parseInt(b.budget.split('-')[1]?.replace(/\D/g, '') || b.budget.replace(/\D/g, ''))
        return maxBudgetB - maxBudgetA
      })
      break
    case 'budget_low':
      result.sort((a, b) => {
        const minBudgetA = parseInt(a.budget.split('-')[0].replace(/\D/g, ''))
        const minBudgetB = parseInt(b.budget.split('-')[0].replace(/\D/g, ''))
        return minBudgetA - minBudgetB
      })
      break
    case 'applications':
      result.sort((a, b) => a.applications - b.applications)
      break
    default:
      // Default sorting (recent) - sort by posted date
      result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
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

  if (budgetMin.value) {
    query.min = budgetMin.value
  } else {
    delete query.min
  }

  if (budgetMax.value) {
    query.max = budgetMax.value
  } else {
    delete query.max
  }

  if (selectedDurations.value.length > 0) {
    query.durations = selectedDurations.value.join(',')
  } else {
    delete query.durations
  }

  if (sortBy.value !== 'recent') {
    query.sort = sortBy.value
  } else {
    delete query.sort
  }

  router.push({ query })
}

const resetFilters = () => {
  selectedCategories.value = []
  budgetMin.value = ''
  budgetMax.value = ''
  selectedDurations.value = []
  sortBy.value = 'recent'

  const query = { ...route.query }
  delete query.categories
  delete query.min
  delete query.max
  delete query.durations
  delete query.sort

  router.push({ query })
}

// Lifecycle
onMounted(() => {
  jobsStore.fetchJobs()

  // Initialize filters from URL query params
  if (route.query.category) {
    selectedCategories.value = [route.query.category]
  } else if (route.query.categories) {
    selectedCategories.value = route.query.categories.split(',')
  }

  if (route.query.min) {
    budgetMin.value = route.query.min
  }

  if (route.query.max) {
    budgetMax.value = route.query.max
  }

  if (route.query.durations) {
    selectedDurations.value = route.query.durations.split(',')
  }

  if (route.query.sort) {
    sortBy.value = route.query.sort
  }

  if (route.query.search) {
    jobsStore.searchJobs(route.query.search)
  }
})

// Watch for query changes
watch(() => route.query, (newQuery) => {
  if (newQuery.search && newQuery.search !== route.query.search) {
    jobsStore.searchJobs(newQuery.search)
  }

  if (newQuery.category && newQuery.category !== route.query.category) {
    selectedCategories.value = [newQuery.category]
  }
}, { deep: true })
</script>
