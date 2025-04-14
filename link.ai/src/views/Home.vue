<template>
  <MainLayout>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-dark to-secondary text-white py-16">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            {{ heroTitle }}
          </h1>
          <p class="text-xl mb-8">
            {{ heroSubtitle }}
          </p>
          <div class="relative max-w-2xl mx-auto">
            <input
              type="text"
              :placeholder="searchPlaceholder"
              class="w-full py-3 px-6 rounded-full text-dark focus:outline-none focus:ring-2 focus:ring-primary"
              v-model="searchQuery"
              @keyup.enter="handleSearch"
            />
            <button
              class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full hover:bg-opacity-90 transition-all"
              @click="handleSearch"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <div class="mt-6 flex flex-wrap justify-center gap-3">
            <span class="text-sm">Popular:</span>
            <router-link
              v-for="(category, index) in popularCategories"
              :key="index"
              :to="isFreelancer ? `/jobs?category=${category}` : `/services?category=${category}`"
              class="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full hover:bg-opacity-30 transition-all"
            >
              {{ category }}
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- User Type Switcher (for logged in users) -->
    <div v-if="isLoggedIn" class="bg-white py-4 shadow-sm">
      <div class="container-custom">
        <div class="flex justify-center space-x-4">
          <button
            @click="viewMode = 'services'"
            class="px-4 py-2 rounded-md transition-colors"
            :class="viewMode === 'services' ? 'bg-primary text-white' : 'bg-white text-secondary hover:bg-gray-200'"
          >
            Parcourir les services
          </button>
          <button
            @click="viewMode = 'jobs'"
            class="px-4 py-2 rounded-md transition-colors"
            :class="viewMode === 'jobs' ? 'bg-primary text-white' : 'bg-white text-secondary hover:bg-gray-200'"
          >
            Parcourir les offres
          </button>
        </div>
      </div>
    </div>

    <!-- Featured Services Section -->
    <section v-if="!isFreelancer || viewMode === 'services'" class="py-16 bg-white">
      <div class="container-custom">
        <div class="flex justify-between items-center mb-10">
          <h2 class="text-3xl font-bold text-dark">Services IA en vedette</h2>
          <router-link to="/services" class="text-primary font-medium hover:underline">
            Voir tout
          </router-link>
        </div>

        <div v-if="loading" class="flex justify-center py-10">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>

        <div v-else-if="services.length === 0" class="text-center py-10">
          <p class="text-xl text-gray-500">Aucun service trouvé</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            v-for="service in services"
            :key="service.id"
            :service="service"
          />
        </div>
      </div>
    </section>

    <!-- Featured Jobs Section -->
    <section v-if="!isCompany || viewMode === 'jobs'" class="py-16 bg-white">
      <div class="container-custom">
        <div class="flex justify-between items-center mb-10">
          <h2 class="text-3xl font-bold text-dark">Offres d'emploi IA en vedette</h2>
          <router-link to="/jobs" class="text-primary font-medium hover:underline">
            Voir tout
          </router-link>
        </div>

        <div v-if="jobsLoading" class="flex justify-center py-10">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>

        <div v-else-if="jobs.length === 0" class="text-center py-10">
          <p class="text-xl text-gray-500">Aucune offre trouvée</p>
        </div>

        <div v-else class="space-y-6">
          <JobCard
            v-for="job in jobs"
            :key="job.id"
            :job="job"
          />
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <h2 class="text-3xl font-bold text-dark text-center mb-10">
          Parcourir par catégorie
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <router-link
            v-for="(category, index) in categories"
            :key="index"
            :to="isFreelancer ? `/jobs?category=${category}` : `/services?category=${category}`"
            class="bg-white rounded-lg p-6 text-center hover:shadow-md transition-all"
          >
            <div class="text-primary mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 class="font-semibold text-dark">{{ category }}</h3>
          </router-link>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <h2 class="text-3xl font-bold text-dark text-center mb-12">
          Comment fonctionne link.ai
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="bg-white rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6 shadow-md">
              <span class="text-3xl font-bold text-primary">1</span>
            </div>
            <h3 class="text-xl font-semibold mb-3">{{ isFreelancer ? 'Find AI Projects' : 'Search for AI Services' }}</h3>
            <p class="text-gray-600">
              {{ isFreelancer ? 'Browse through job opportunities posted by companies looking for AI specialists.' : 'Browse through our extensive catalog of AI services offered by expert freelancers.' }}
            </p>
          </div>

          <div class="text-center">
            <div class="bg-white rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6 shadow-md">
              <span class="text-3xl font-bold text-primary">2</span>
            </div>
            <h3 class="text-xl font-semibold mb-3">{{ isFreelancer ? 'Apply for Projects' : 'Connect with AI Experts' }}</h3>
            <p class="text-gray-600">
              {{ isFreelancer ? 'Submit your application for projects that match your skills and expertise.' : 'Find the perfect AI specialist for your project and discuss your requirements.' }}
            </p>
          </div>

          <div class="text-center">
            <div class="bg-white rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6 shadow-md">
              <span class="text-3xl font-bold text-primary">3</span>
            </div>
            <h3 class="text-xl font-semibold mb-3">{{ isFreelancer ? 'Deliver Quality Work' : 'Get Your AI Project Done' }}</h3>
            <p class="text-gray-600">
              {{ isFreelancer ? 'Complete projects successfully and build your reputation on the platform.' : 'Work with your chosen freelancer to complete your AI project successfully.' }}
            </p>
          </div>
        </div>

        <div class="text-center mt-12">
          <router-link to="/register" class="btn-primary">
            Commencer
          </router-link>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <h2 class="text-3xl font-bold text-dark text-center mb-12">
          Ce que disent nos clients
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(testimonial, index) in testimonials" :key="index" class="bg-white p-6 rounded-lg">
            <div class="flex items-center mb-4">
              <img :src="testimonial.avatar" :alt="testimonial.name" class="w-12 h-12 rounded-full object-cover mr-4" />
              <div>
                <h4 class="font-semibold text-dark">{{ testimonial.name }}</h4>
                <p class="text-sm text-gray-600">{{ testimonial.company }}</p>
              </div>
            </div>
            <div class="flex mb-4">
              <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="i <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-gray-600">{{ testimonial.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary">
      <div class="container-custom text-center">
        <h2 class="text-3xl font-bold text-white mb-6">
          {{ isFreelancer ? 'Ready to Find Your Next AI Project?' : 'Need an AI Expert for Your Project?' }}
        </h2>
        <p class="text-white text-xl mb-8 max-w-2xl mx-auto">
          {{ isFreelancer ? 'Browse available AI projects and connect with companies looking for your skills.' : 'Post a job or browse services to find the perfect AI specialist for your needs.' }}
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <router-link v-if="isLoggedIn && isCompany" to="/post-job" class="bg-white text-primary font-semibold py-3 px-6 rounded-md hover:bg-opacity-90 transition-all">
            Publier une offre
          </router-link>
          <router-link v-else-if="isLoggedIn && isFreelancer" to="/jobs" class="bg-white text-primary font-semibold py-3 px-6 rounded-md hover:bg-opacity-90 transition-all">
            Trouver des offres
          </router-link>
          <router-link v-else to="/register" class="bg-white text-primary font-semibold py-3 px-6 rounded-md hover:bg-opacity-90 transition-all">
            S'inscrire maintenant
          </router-link>
          <router-link :to="isFreelancer ? '/jobs' : '/services'" class="border-2 border-white text-white font-semibold py-3 px-6 rounded-md hover:bg-white hover:bg-opacity-10 transition-all">
            {{ isFreelancer ? 'Parcourir les offres' : 'Parcourir les services' }}
          </router-link>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MainLayout from '../components/layout/MainLayout.vue'
import ServiceCard from '../components/services/ServiceCard.vue'
import JobCard from '../components/jobs/JobCard.vue'
import { useServicesStore } from '../store/servicesStore'
import { useJobsStore } from '../store/jobsStore'
import { useUserStore } from '../store/userStore'

const router = useRouter()
const servicesStore = useServicesStore()
const jobsStore = useJobsStore()
const userStore = useUserStore()

const searchQuery = ref('')
const viewMode = ref('services') // 'services' or 'jobs'

// User state
const isLoggedIn = computed(() => userStore.isLoggedIn)
const user = computed(() => userStore.getUser)
const isCompany = computed(() => user.value?.accountType === 'client')
const isFreelancer = computed(() => user.value?.accountType === 'freelancer')

// Services state
const loading = computed(() => servicesStore.loading)
const services = computed(() => servicesStore.getAllServices)

// Jobs state
const jobsLoading = computed(() => jobsStore.loading)
const jobs = computed(() => jobsStore.getAllJobs)

// Shared state
const categories = computed(() => servicesStore.getCategories)
const popularCategories = computed(() => categories.value.slice(0, 4))

// Dynamic content based on user type
const heroTitle = computed(() => {
  if (isFreelancer.value) return 'Trouvez des projets IA qui ont besoin de vos compétences'
  return 'Connectez-vous avec des freelances experts en IA'
})

const heroSubtitle = computed(() => {
  if (isFreelancer.value) return 'Parcourez les offres d\'emploi des entreprises à la recherche de spécialistes en IA'
  return 'Trouvez le spécialiste IA parfait pour donner vie à vos projets'
})

const searchPlaceholder = computed(() => {
  if (isFreelancer.value) return 'Rechercher des offres d\'emploi IA...'
  return 'Rechercher des services IA...'
})

const testimonials = [
  {
    name: 'Marie Dubois',
    company: 'InnovTech SAS',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    rating: 5,
    text: 'Nous avons engagé un développeur de chatbot IA via link.ai et avons été impressionnés par les résultats. Le freelance était professionnel, réactif et a livré exactement ce dont nous avions besoin.'
  },
  {
    name: 'Thomas Laurent',
    company: 'DataVision SARL',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    rating: 5,
    text: 'L\'expert en machine learning que nous avons trouvé sur link.ai nous a aidés à implémenter un système de recommandation qui a augmenté nos taux de conversion de 30%. Fortement recommandé !'
  },
  {
    name: 'Sophie Martin',
    company: 'IA Innovante',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    rating: 4,
    text: 'link.ai nous a permis de trouver facilement un spécialiste en vision par ordinateur pour notre projet d\'analyse retail. La qualité des talents sur cette plateforme est exceptionnelle.'
  }
]

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    if (isFreelancer.value || viewMode.value === 'jobs') {
      router.push({
        path: '/jobs',
        query: { search: searchQuery.value }
      })
    } else {
      router.push({
        path: '/services',
        query: { search: searchQuery.value }
      })
    }
  }
}

onMounted(() => {
  // Check if user is authenticated
  userStore.checkAuth()

  // Fetch data
  servicesStore.fetchServices()
  jobsStore.fetchJobs()

  // Set default view mode based on user type
  if (isFreelancer.value) {
    viewMode.value = 'jobs'
  }
})
</script>
