<template>
  <MainLayout>
    <div class="bg-white py-8">
      <div class="container-custom">
        <div v-if="loading" class="flex justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>

        <div v-else-if="!service" class="bg-white p-10 rounded-lg shadow-sm text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-semibold mb-2">Service introuvable</h3>
          <p class="text-gray-600 mb-4">Le service que vous recherchez n'existe pas ou a été supprimé</p>
          <router-link to="/services" class="btn-primary">
            Parcourir les services
          </router-link>
        </div>

        <div v-else class="flex flex-col lg:flex-row gap-8">
          <!-- Service Details -->
          <div class="w-full lg:w-2/3">
            <div class="bg-white rounded-lg shadow-sm overflow-hidden">
              <!-- Service Image -->
              <div class="h-80 overflow-hidden">
                <img :src="service.image" :alt="service.title" class="w-full h-full object-cover" />
              </div>

              <!-- Service Content -->
              <div class="p-6">
                <h1 class="text-3xl font-bold text-dark mb-4">{{ service.title }}</h1>

                <div class="flex items-center mb-6">
                  <router-link :to="`/profile/${service.user.id}`" class="flex items-center">
                    <img
                      :src="service.user.avatar"
                      :alt="service.user.name"
                      class="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <span class="font-medium text-dark">{{ service.user.name }}</span>
                      <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span class="text-sm text-gray-600 ml-1">{{ service.user.rating }} (120 avis)</span>
                      </div>
                    </div>
                  </router-link>
                </div>

                <div class="mb-8">
                  <h2 class="text-xl font-semibold mb-3">À propos de ce service</h2>
                  <p class="text-gray-700 whitespace-pre-line">{{ service.description }}</p>
                </div>

                <div class="mb-8">
                  <h2 class="text-xl font-semibold mb-3">Ce que vous obtiendrez</h2>
                  <ul class="space-y-2">
                    <li class="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      <span class="text-gray-700">Solution IA personnalisée adaptée à vos besoins spécifiques</span>
                    </li>
                    <li class="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      <span class="text-gray-700">Code source et documentation</span>
                    </li>
                    <li class="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      <span class="text-gray-700">Support et accompagnement pour l'implémentation</span>
                    </li>
                    <li class="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      <span class="text-gray-700">2 cycles de révisions pour garantir votre satisfaction</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 class="text-xl font-semibold mb-3">Tags associés</h2>
                  <div class="flex flex-wrap gap-2">
                    <span class="bg-white px-3 py-1 rounded-full text-sm text-secondary">
                      {{ service.category }}
                    </span>
                    <span
                      v-for="(tag, index) in getServiceTags"
                      :key="index"
                      class="bg-white px-3 py-1 rounded-full text-sm text-secondary"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Box -->
          <div class="w-full lg:w-1/3">
            <div class="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-dark">
                  ${{ service.price }}
                </h2>
                <span class="text-sm text-gray-600">
                  Livraison en 7 jours
                </span>
              </div>

              <p class="text-gray-700 mb-6">
                Prêt à commencer votre projet IA ? Commandez maintenant et travaillez avec un spécialiste IA hautement qualifié.
              </p>

              <button
                class="w-full btn-primary mb-4"
                @click="openChat"
              >
                Contacter {{ service?.user?.name?.split(' ')[0] || 'le professionnel' }}
              </button>

              <div class="mt-6 pt-6 border-t border-gray-200">
                <h3 class="font-semibold mb-3">Ce forfait comprend :</h3>
                <ul class="space-y-2">
                  <li class="flex items-center text-sm text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    Solution IA personnalisée
                  </li>
                  <li class="flex items-center text-sm text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    Code source inclus
                  </li>
                  <li class="flex items-center text-sm text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    2 révisions
                  </li>
                  <li class="flex items-center text-sm text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    Livraison en 7 jours
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Modal -->
    <ChatModal
      :is-open="isChatOpen"
      :recipient="service?.user || {}"
      @close="isChatOpen = false"
      @send-message="handleSendMessage"
    />
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MainLayout from '../components/layout/MainLayout.vue'
import ChatModal from '../components/chat/ChatModal.vue'
import { useServicesStore } from '../store/servicesStore'
import { useUserStore } from '../store/userStore'
import { useMessagesStore } from '../store/messagesStore'

const route = useRoute()
const router = useRouter()
const servicesStore = useServicesStore()
const userStore = useUserStore()
const messagesStore = useMessagesStore()

// Chat state
const isChatOpen = ref(false)

const loading = ref(true)
const serviceId = computed(() => Number(route.params.id))
const service = ref(null)

// Generate French tags based on service category
const getServiceTags = computed(() => {
  if (!service.value) return []

  const category = service.value.category
  const tags = []

  // Add related tags based on category
  if (category === 'Développement IA') {
    tags.push('Intelligence Artificielle', 'Solutions personnalisées')
  } else if (category === 'Apprentissage Automatique') {
    tags.push('Machine Learning', 'Analyse de données')
  } else if (category === 'Vision par Ordinateur') {
    tags.push('Reconnaissance d\'images', 'Détection d\'objets')
  } else if (category === 'Traitement du Langage Naturel') {
    tags.push('NLP', 'Analyse de texte')
  } else if (category === 'Développement de Chatbot') {
    tags.push('Chatbots', 'IA conversationnelle')
  } else if (category === 'Intégration IA') {
    tags.push('API', 'Intégration système')
  } else if (category === 'Conseil en IA') {
    tags.push('Stratégie', 'Transformation digitale')
  } else if (category === 'Science des Données') {
    tags.push('Big Data', 'Visualisation')
  }

  return tags
})

const fetchServiceDetails = async () => {
  loading.value = true
  try {
    // First try to get from store cache
    const cachedService = servicesStore.getServiceById(serviceId.value)

    if (cachedService) {
      service.value = cachedService
    } else {
      // If not in cache, fetch from API
      const fetchedService = await servicesStore.fetchServiceById(serviceId.value)
      service.value = fetchedService
    }
  } catch (error) {
    console.error('Error fetching service details:', error)
  } finally {
    loading.value = false
  }
}

// Chat functions
const openChat = async () => {
  // Check if user is logged in
  if (!userStore.isLoggedIn) {
    // Redirect to login page
    router.push({
      path: '/login',
      query: { redirect: route.fullPath }
    })
    return
  }

  // Initialize chat with the service provider
  if (service.value && service.value.user) {
    // Pre-fetch conversation to avoid loading state
    await messagesStore.fetchConversation(service.value.user.id)
  }

  isChatOpen.value = true
}

const handleSendMessage = async (message) => {
  if (service.value && service.value.user) {
    try {
      await messagesStore.sendMessage(message.text, service.value.user.id)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }
}

onMounted(async () => {
  // Fetch all services to populate the store
  await servicesStore.fetchServices()

  // Fetch specific service details
  await fetchServiceDetails()
})
</script>
