<template>
  <MainLayout>
    <div class="bg-white py-16">
      <div class="container-custom max-w-md">
        <div class="bg-white rounded-lg shadow-md p-8">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-dark mb-2">Join link.ai</h1>
            <p class="text-gray-600">Create an account to get started</p>
          </div>

          <form @submit.prevent="handleRegister">
            <div class="mb-4">
              <label for="name" class="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                v-model="name"
                class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div class="mb-4">
              <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                v-model="email"
                class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your email"
                required
              />
            </div>

            <div class="mb-4">
              <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                v-model="password"
                class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Create a password"
                required
              />
            </div>

            <div class="mb-6">
              <label for="accountType" class="block text-gray-700 font-medium mb-2">Account Type</label>
              <div class="grid grid-cols-2 gap-4">
                <div
                  class="border rounded-md p-3 cursor-pointer"
                  :class="accountType === 'client' ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-300'"
                  @click="accountType = 'client'"
                >
                  <div class="flex items-center">
                    <input
                      type="radio"
                      id="client"
                      name="accountType"
                      value="client"
                      v-model="accountType"
                      class="mr-2"
                    />
                    <label for="client" class="cursor-pointer">
                      <div class="font-medium">Client</div>
                      <div class="text-xs text-gray-600">I need AI services</div>
                    </label>
                  </div>
                </div>

                <div
                  class="border rounded-md p-3 cursor-pointer"
                  :class="accountType === 'freelancer' ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-300'"
                  @click="accountType = 'freelancer'"
                >
                  <div class="flex items-center">
                    <input
                      type="radio"
                      id="freelancer"
                      name="accountType"
                      value="freelancer"
                      v-model="accountType"
                      class="mr-2"
                    />
                    <label for="freelancer" class="cursor-pointer">
                      <div class="font-medium">Freelancer</div>
                      <div class="text-xs text-gray-600">I offer AI services</div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-6">
              <div class="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  v-model="agreeToTerms"
                  class="mt-1 mr-2"
                  required
                />
                <label for="terms" class="text-sm text-gray-600">
                  I agree to the
                  <router-link to="/terms" class="text-primary hover:underline">Terms of Service</router-link>
                  and
                  <router-link to="/privacy" class="text-primary hover:underline">Privacy Policy</router-link>
                </label>
              </div>
            </div>

            <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {{ error }}
            </div>

            <button
              type="submit"
              class="w-full btn-primary"
              :disabled="loading || !agreeToTerms"
            >
              <span v-if="loading">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
              <span v-else>Create Account</span>
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-gray-600">
              Already have an account?
              <router-link to="/login" class="text-primary font-medium hover:underline">
                Sign in
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MainLayout from '../components/layout/MainLayout.vue'
import { useUserStore } from '../store/userStore'

const router = useRouter()
const userStore = useUserStore()

const name = ref('')
const email = ref('')
const password = ref('')
const accountType = ref('client')
const agreeToTerms = ref(false)
const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  loading.value = true
  error.value = ''

  try {
    // Call the register method from the user store
    await userStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
      accountType: accountType.value
    })

    // If registration is successful, redirect to dashboard
    router.push('/dashboard')
  } catch (err) {
    error.value = err.message || 'An error occurred during registration'
  } finally {
    loading.value = false
  }
}
</script>
