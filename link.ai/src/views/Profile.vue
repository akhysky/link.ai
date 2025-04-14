<template>
  <MainLayout>
    <div class="bg-white py-8">
      <div class="container-custom">
        <div v-if="loading" class="flex justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
        
        <div v-else-if="!profile" class="bg-white p-10 rounded-lg shadow-sm text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-semibold mb-2">Profile not found</h3>
          <p class="text-gray-600 mb-4">The user profile you're looking for doesn't exist</p>
          <router-link to="/" class="btn-primary">
            Go to Homepage
          </router-link>
        </div>
        
        <div v-else>
          <!-- Profile Header -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div class="h-48 bg-gradient-to-r from-primary to-primary-dark"></div>
            <div class="p-6 relative">
              <div class="absolute -top-16 left-6">
                <img 
                  :src="profile.avatar" 
                  :alt="profile.name" 
                  class="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
              </div>
              
              <div class="ml-40">
                <div class="flex justify-between items-start">
                  <div>
                    <h1 class="text-3xl font-bold text-dark mb-1">{{ profile.name }}</h1>
                    <p class="text-gray-600">{{ profile.accountType === 'freelancer' ? 'AI Freelancer' : 'Client' }}</p>
                  </div>
                  
                  <div class="flex space-x-3">
                    <button class="btn-primary" v-if="profile.accountType === 'freelancer'">
                      Contact Me
                    </button>
                    <button class="border border-primary text-primary py-2 px-4 rounded-md hover:bg-primary hover:text-white transition-all">
                      Share Profile
                    </button>
                  </div>
                </div>
                
                <div class="flex items-center mt-4">
                  <div class="flex items-center mr-6">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="font-medium">4.9</span>
                    <span class="text-gray-600 ml-1">(120 reviews)</span>
                  </div>
                  
                  <div class="text-gray-600 mr-6">
                    <span class="font-medium">Member since:</span> April 2023
                  </div>
                  
                  <div class="text-gray-600">
                    <span class="font-medium">Response time:</span> 2 hours
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Profile Info -->
            <div class="lg:col-span-1">
              <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 class="text-xl font-semibold text-dark mb-4">About Me</h2>
                <p class="text-gray-700 mb-6">
                  {{ profile.bio || 'I am an AI specialist with expertise in machine learning, natural language processing, and computer vision. With over 5 years of experience, I help businesses implement cutting-edge AI solutions to solve real-world problems.' }}
                </p>
                
                <div class="space-y-4">
                  <div v-if="profile.location">
                    <h3 class="font-medium text-dark">Location</h3>
                    <p class="text-gray-600">{{ profile.location || 'San Francisco, CA' }}</p>
                  </div>
                  
                  <div>
                    <h3 class="font-medium text-dark">Languages</h3>
                    <p class="text-gray-600">English (Fluent), Spanish (Conversational)</p>
                  </div>
                  
                  <div v-if="profile.accountType === 'freelancer'">
                    <h3 class="font-medium text-dark">Skills</h3>
                    <div class="flex flex-wrap gap-2 mt-2">
                      <span class="bg-white px-3 py-1 rounded-full text-sm text-secondary">
                        Machine Learning
                      </span>
                      <span class="bg-white px-3 py-1 rounded-full text-sm text-secondary">
                        Natural Language Processing
                      </span>
                      <span class="bg-white px-3 py-1 rounded-full text-sm text-secondary">
                        Computer Vision
                      </span>
                      <span class="bg-white px-3 py-1 rounded-full text-sm text-secondary">
                        Python
                      </span>
                      <span class="bg-white px-3 py-1 rounded-full text-sm text-secondary">
                        TensorFlow
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-if="profile.accountType === 'freelancer'" class="bg-white rounded-lg shadow-sm p-6">
                <h2 class="text-xl font-semibold text-dark mb-4">Education & Certifications</h2>
                <div class="space-y-4">
                  <div>
                    <h3 class="font-medium text-dark">Stanford University</h3>
                    <p class="text-gray-600">M.S. in Computer Science, AI Specialization</p>
                    <p class="text-sm text-gray-500">2018 - 2020</p>
                  </div>
                  
                  <div>
                    <h3 class="font-medium text-dark">Google AI Professional Certificate</h3>
                    <p class="text-gray-600">Advanced Machine Learning</p>
                    <p class="text-sm text-gray-500">2021</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Services or Reviews -->
            <div class="lg:col-span-2">
              <div v-if="profile.accountType === 'freelancer'" class="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div class="flex justify-between items-center mb-6">
                  <h2 class="text-xl font-semibold text-dark">Services</h2>
                  <span class="text-gray-600">{{ services.length }} services</span>
                </div>
                
                <div v-if="services.length === 0" class="text-center py-8">
                  <p class="text-gray-600">No services available</p>
                </div>
                
                <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ServiceCard
                    v-for="service in services"
                    :key="service.id"
                    :service="service"
                  />
                </div>
              </div>
              
              <div class="bg-white rounded-lg shadow-sm p-6">
                <div class="flex justify-between items-center mb-6">
                  <h2 class="text-xl font-semibold text-dark">Reviews</h2>
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="font-medium">4.9</span>
                    <span class="text-gray-600 ml-1">(120 reviews)</span>
                  </div>
                </div>
                
                <div class="space-y-6">
                  <div v-for="(review, index) in reviews" :key="index" class="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <div class="flex justify-between items-start mb-3">
                      <div class="flex items-start">
                        <img :src="review.user.avatar" :alt="review.user.name" class="w-10 h-10 rounded-full object-cover mr-3" />
                        <div>
                          <h3 class="font-medium text-dark">{{ review.user.name }}</h3>
                          <p class="text-sm text-gray-600">{{ review.date }}</p>
                        </div>
                      </div>
                      <div class="flex">
                        <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                    <p class="text-gray-700">{{ review.text }}</p>
                  </div>
                </div>
                
                <div class="mt-6 text-center">
                  <button class="text-primary font-medium hover:underline">
                    Load More Reviews
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '../components/layout/MainLayout.vue'
import ServiceCard from '../components/services/ServiceCard.vue'
import { useServicesStore } from '../store/servicesStore'

const route = useRoute()
const servicesStore = useServicesStore()

const loading = ref(true)
const profile = ref(null)
const services = computed(() => {
  return servicesStore.getAllServices.filter(service => 
    service.user.id === Number(route.params.id)
  )
})

// Mock reviews data
const reviews = ref([
  {
    user: {
      name: 'John Smith',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
    },
    rating: 5,
    date: 'March 15, 2023',
    text: 'Excellent work! The AI chatbot developed for our customer service exceeded our expectations. Very professional and responsive throughout the project.'
  },
  {
    user: {
      name: 'Emily Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg'
    },
    rating: 5,
    date: 'February 28, 2023',
    text: 'Great experience working with this freelancer. They delivered a high-quality machine learning model that perfectly fits our needs. Highly recommended!'
  },
  {
    user: {
      name: 'Michael Brown',
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg'
    },
    rating: 4,
    date: 'February 10, 2023',
    text: 'Good communication and delivered on time. The computer vision solution works well, though we needed some minor adjustments after delivery.'
  }
])

onMounted(async () => {
  await servicesStore.fetchServices()
  
  // In a real app, this would be an API call to get the user profile
  // const response = await api.get(`/users/${route.params.id}`)
  // profile.value = response.data
  
  // For demo purposes, we'll use mock data
  setTimeout(() => {
    // Find a matching user from our services
    const user = servicesStore.getAllServices.find(service => 
      service.user.id === Number(route.params.id)
    )?.user
    
    if (user) {
      profile.value = {
        ...user,
        accountType: 'freelancer',
        bio: 'I am an AI specialist with expertise in machine learning, natural language processing, and computer vision. With over 5 years of experience, I help businesses implement cutting-edge AI solutions to solve real-world problems.',
        location: 'San Francisco, CA'
      }
    } else {
      // If no matching user, create a default one
      profile.value = {
        id: Number(route.params.id),
        name: 'AI Expert',
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
        rating: 4.9,
        accountType: 'freelancer',
        bio: 'I am an AI specialist with expertise in machine learning, natural language processing, and computer vision. With over 5 years of experience, I help businesses implement cutting-edge AI solutions to solve real-world problems.',
        location: 'San Francisco, CA'
      }
    }
    
    loading.value = false
  }, 1000)
})
</script>
