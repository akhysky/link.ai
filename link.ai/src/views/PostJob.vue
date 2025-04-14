<template>
  <MainLayout>
    <div class="bg-white py-8">
      <div class="container-custom max-w-3xl">
        <div class="bg-white rounded-lg shadow-md p-8">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-dark mb-2">Post a Job</h1>
            <p class="text-gray-600">Find the perfect AI specialist for your project</p>
          </div>
          
          <div v-if="!isLoggedIn || !isCompany" class="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h3 class="text-xl font-semibold mb-2">Access Restricted</h3>
            <p class="text-gray-600 mb-4">
              {{ !isLoggedIn ? 'You need to sign in to post a job' : 'Only company accounts can post jobs' }}
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-4">
              <router-link v-if="!isLoggedIn" to="/login" class="btn-primary">
                Sign In
              </router-link>
              <router-link v-if="!isLoggedIn" to="/register" class="border border-primary text-primary py-2 px-4 rounded-md hover:bg-primary hover:text-white transition-all">
                Create Account
              </router-link>
              <router-link v-if="isLoggedIn && !isCompany" to="/jobs" class="btn-primary">
                Browse Jobs
              </router-link>
            </div>
          </div>
          
          <form v-else @submit.prevent="submitJob" class="space-y-6">
            <div>
              <label for="title" class="block text-gray-700 font-medium mb-2">Job Title</label>
              <input
                type="text"
                id="title"
                v-model="jobData.title"
                class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., AI Engineer for Chatbot Development"
                required
              />
            </div>
            
            <div>
              <label for="category" class="block text-gray-700 font-medium mb-2">Category</label>
              <select
                id="category"
                v-model="jobData.category"
                class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="" disabled>Select a category</option>
                <option v-for="(category, index) in categories" :key="index" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>
            
            <div>
              <label for="description" class="block text-gray-700 font-medium mb-2">Job Description</label>
              <textarea
                id="description"
                v-model="jobData.description"
                rows="6"
                class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Describe the job in detail..."
                required
              ></textarea>
            </div>
            
            <div>
              <label class="block text-gray-700 font-medium mb-2">Requirements</label>
              <div v-for="(req, index) in jobData.requirements" :key="index" class="flex mb-2">
                <input
                  type="text"
                  v-model="jobData.requirements[index]"
                  class="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Add a requirement"
                  required
                />
                <button 
                  type="button" 
                  @click="removeRequirement(index)" 
                  class="ml-2 p-3 text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <button 
                type="button" 
                @click="addRequirement" 
                class="mt-2 text-primary hover:text-primary-dark flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Requirement
              </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="budget" class="block text-gray-700 font-medium mb-2">Budget (USD)</label>
                <input
                  type="text"
                  id="budget"
                  v-model="jobData.budget"
                  class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., 3000-5000"
                  required
                />
              </div>
              
              <div>
                <label for="duration" class="block text-gray-700 font-medium mb-2">Duration</label>
                <input
                  type="text"
                  id="duration"
                  v-model="jobData.duration"
                  class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., 2-3 months"
                  required
                />
              </div>
            </div>
            
            <div v-if="error" class="p-3 bg-red-100 text-red-700 rounded-md">
              {{ error }}
            </div>
            
            <div v-if="success" class="p-3 bg-green-100 text-green-700 rounded-md">
              {{ success }}
            </div>
            
            <div class="flex justify-end space-x-4">
              <router-link to="/jobs" class="border border-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-100 transition-all">
                Cancel
              </router-link>
              <button
                type="submit"
                class="btn-primary px-6"
                :disabled="submitting"
              >
                <span v-if="submitting">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Posting...
                </span>
                <span v-else>Post Job</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MainLayout from '../components/layout/MainLayout.vue'
import { useJobsStore } from '../store/jobsStore'
import { useUserStore } from '../store/userStore'
import { useServicesStore } from '../store/servicesStore'

const router = useRouter()
const jobsStore = useJobsStore()
const userStore = useUserStore()
const servicesStore = useServicesStore()

const submitting = ref(false)
const error = ref('')
const success = ref('')

const jobData = ref({
  title: '',
  category: '',
  description: '',
  requirements: [''],
  budget: '',
  duration: '',
  company: null
})

const isLoggedIn = computed(() => userStore.isLoggedIn)
const user = computed(() => userStore.getUser)
const isCompany = computed(() => user.value?.accountType === 'client')
const categories = computed(() => servicesStore.getCategories)

const addRequirement = () => {
  jobData.value.requirements.push('')
}

const removeRequirement = (index) => {
  if (jobData.value.requirements.length > 1) {
    jobData.value.requirements.splice(index, 1)
  }
}

const submitJob = async () => {
  submitting.value = true
  error.value = ''
  success.value = ''
  
  try {
    // Filter out empty requirements
    jobData.value.requirements = jobData.value.requirements.filter(req => req.trim() !== '')
    
    // Add company data
    jobData.value.company = {
      id: user.value.id,
      name: user.value.name,
      logo: user.value.avatar || 'https://placehold.co/100x100?text=CO',
      description: 'A company looking for AI talent',
      location: 'Remote'
    }
    
    const result = await jobsStore.createJob(jobData.value)
    
    success.value = 'Job posted successfully!'
    
    // Reset form
    setTimeout(() => {
      router.push(`/job/${result.id}`)
    }, 1500)
  } catch (err) {
    error.value = err.message || 'An error occurred while posting the job'
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  // Check if user is authenticated and is a company
  userStore.checkAuth()
})
</script>
