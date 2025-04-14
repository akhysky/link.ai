<template>
  <MainLayout>
    <div class="bg-white py-8">
      <div class="container-custom">
        <div v-if="loading" class="flex justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>

        <div v-else-if="!job" class="bg-white p-10 rounded-lg shadow-sm text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-semibold mb-2">Job not found</h3>
          <p class="text-gray-600 mb-4">The job you're looking for doesn't exist or has been removed</p>
          <router-link to="/jobs" class="btn-primary">
            Browse Jobs
          </router-link>
        </div>

        <div v-else class="flex flex-col lg:flex-row gap-8">
          <!-- Job Details -->
          <div class="w-full lg:w-2/3">
            <div class="bg-white rounded-lg shadow-sm overflow-hidden">
              <!-- Job Content -->
              <div class="p-6">
                <div class="flex items-center mb-6">
                  <img
                    :src="job.company.logo"
                    :alt="job.company.name"
                    class="w-16 h-16 rounded-md object-cover mr-4"
                  />
                  <div>
                    <router-link :to="`/company/${job.company.id}`" class="text-xl font-semibold text-dark hover:text-primary transition-colors">
                      {{ job.company.name }}
                    </router-link>
                    <div class="text-gray-600">{{ job.company.location }}</div>
                  </div>
                </div>

                <h1 class="text-3xl font-bold text-dark mb-4">{{ job.title }}</h1>

                <div class="flex flex-wrap gap-3 mb-6">
                  <span class="px-3 py-1 bg-white rounded-full text-secondary text-sm">
                    {{ job.category }}
                  </span>
                  <span class="px-3 py-1 bg-blue-50 rounded-full text-blue-600 text-sm">
                    Budget: ${{ job.budget }}
                  </span>
                  <span class="px-3 py-1 bg-green-50 rounded-full text-green-600 text-sm">
                    Duration: {{ job.duration }}
                  </span>
                  <span class="px-3 py-1 bg-purple-50 rounded-full text-purple-600 text-sm">
                    {{ job.applications }} applications
                  </span>
                </div>

                <div class="mb-8">
                  <h2 class="text-xl font-semibold mb-3">Job Description</h2>
                  <p class="text-gray-700 whitespace-pre-line">{{ job.description }}</p>
                </div>

                <div class="mb-8">
                  <h2 class="text-xl font-semibold mb-3">Requirements</h2>
                  <ul class="list-disc pl-5 space-y-2">
                    <li v-for="(requirement, index) in job.requirements" :key="index" class="text-gray-700">
                      {{ requirement }}
                    </li>
                  </ul>
                </div>

                <div class="mb-8">
                  <h2 class="text-xl font-semibold mb-3">About the Company</h2>
                  <p class="text-gray-700">{{ job.company.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Apply Box -->
          <div class="w-full lg:w-1/3">
            <div class="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-dark">
                  ${{ job.budget }}
                </h2>
                <span class="text-sm text-gray-600">
                  {{ job.duration }}
                </span>
              </div>

              <p class="text-gray-700 mb-6">
                Ready to apply for this AI project? Submit your application now to connect with {{ job.company.name }}.
              </p>

              <div v-if="!isLoggedIn">
                <p class="text-center text-gray-600 mb-4">You need to sign in to apply for this job</p>
                <router-link to="/login" class="w-full btn-primary block text-center mb-3">
                  Sign In
                </router-link>
                <router-link to="/register" class="w-full border border-primary text-primary py-2 px-4 rounded-md hover:bg-primary hover:text-white transition-all block text-center">
                  Create Account
                </router-link>
              </div>

              <div v-else-if="isCompany">
                <p class="text-center text-gray-600 mb-4">You cannot apply for jobs as a company account</p>
                <router-link to="/jobs" class="w-full btn-primary block text-center">
                  Browse More Jobs
                </router-link>
              </div>

              <div v-else>
                <button
                  v-if="!showApplicationForm"
                  @click="showApplicationForm = true"
                  class="w-full btn-primary mb-4"
                >
                  Apply Now
                </button>

                <form v-else @submit.prevent="submitApplication" class="space-y-4">
                  <div>
                    <label for="coverLetter" class="block text-gray-700 font-medium mb-2">Cover Letter</label>
                    <textarea
                      id="coverLetter"
                      v-model="application.coverLetter"
                      rows="5"
                      class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Explain why you're a good fit for this job..."
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label for="rate" class="block text-gray-700 font-medium mb-2">Your Rate (USD)</label>
                    <input
                      type="number"
                      id="rate"
                      v-model="application.rate"
                      class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter your rate"
                      required
                    />
                  </div>

                  <div>
                    <label for="estimatedTime" class="block text-gray-700 font-medium mb-2">Estimated Completion Time</label>
                    <input
                      type="text"
                      id="estimatedTime"
                      v-model="application.estimatedTime"
                      class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., 2 weeks, 1 month"
                      required
                    />
                  </div>

                  <div class="flex space-x-3">
                    <button
                      type="button"
                      @click="showApplicationForm = false"
                      class="w-1/2 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="w-1/2 btn-primary"
                      :disabled="submitting"
                    >
                      <span v-if="submitting">
                        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                      <span v-else>Submit Application</span>
                    </button>
                  </div>
                </form>
              </div>

              <div v-if="applicationSuccess" class="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
                {{ applicationSuccess }}
              </div>

              <div class="mt-6 pt-6 border-t border-gray-200">
                <h3 class="font-semibold mb-3">Job Posted:</h3>
                <p class="text-gray-700 mb-4">{{ formatDate(job.postedDate) }}</p>

                <h3 class="font-semibold mb-3">Share this job:</h3>
                <div class="flex space-x-3">
                  <button class="text-blue-600 hover:text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </button>
                  <button class="text-blue-800 hover:text-blue-900">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </button>
                  <button class="text-gray-600 hover:text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
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
import { useRoute, useRouter } from 'vue-router'
import MainLayout from '../components/layout/MainLayout.vue'
import { useJobsStore } from '../store/jobsStore'
import { useUserStore } from '../store/userStore'

const route = useRoute()
const router = useRouter()
const jobsStore = useJobsStore()
const userStore = useUserStore()

const loading = ref(true)
const showApplicationForm = ref(false)
const submitting = ref(false)
const applicationSuccess = ref('')
const jobId = computed(() => Number(route.params.id))
const job = ref(null)

const isLoggedIn = computed(() => userStore.isLoggedIn)
const user = computed(() => userStore.getUser)
const isCompany = computed(() => user.value?.accountType === 'client')

const application = ref({
  coverLetter: '',
  rate: '',
  estimatedTime: ''
})

const fetchJobDetails = async () => {
  loading.value = true
  try {
    // First try to get from store cache
    const cachedJob = jobsStore.getJobById(jobId.value)

    if (cachedJob) {
      job.value = cachedJob
    } else {
      // If not in cache, fetch from API
      const fetchedJob = await jobsStore.fetchJobById(jobId.value)
      job.value = fetchedJob
    }
  } catch (error) {
    console.error('Error fetching job details:', error)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const submitApplication = async () => {
  submitting.value = true
  try {
    const result = await jobsStore.applyForJob(jobId.value, {
      userId: user.value.id,
      ...application.value
    })

    applicationSuccess.value = result.message
    showApplicationForm.value = false
    application.value = {
      coverLetter: '',
      rate: '',
      estimatedTime: ''
    }
  } catch (error) {
    console.error('Error applying for job:', error)
    applicationSuccess.value = 'An error occurred. Please try again.'
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  // Fetch all jobs to populate the store
  await jobsStore.fetchJobs()

  // Fetch specific job details
  await fetchJobDetails()
})
</script>
