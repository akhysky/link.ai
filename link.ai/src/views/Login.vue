<template>
  <MainLayout>
    <div class="bg-white py-16">
      <div class="container-custom max-w-md">
        <div class="bg-white rounded-lg shadow-md p-8">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-dark mb-2">Welcome Back</h1>
            <p class="text-gray-600">Sign in to your link.ai account</p>
          </div>

          <form @submit.prevent="handleLogin">
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

            <div class="mb-6">
              <div class="flex justify-between items-center mb-2">
                <label for="password" class="block text-gray-700 font-medium">Password</label>
                <a href="#" class="text-sm text-primary hover:underline">Forgot password?</a>
              </div>
              <input
                type="password"
                id="password"
                v-model="password"
                class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your password"
                required
              />
            </div>

            <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {{ error }}
            </div>

            <button
              type="submit"
              class="w-full btn-primary"
              :disabled="loading"
            >
              <span v-if="loading">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
              <span v-else>Sign In</span>
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-gray-600">
              Don't have an account?
              <router-link to="/register" class="text-primary font-medium hover:underline">
                Sign up
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

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    // Call the login method from the user store
    await userStore.login(email.value, password.value)

    // If login is successful, redirect to dashboard
    router.push('/dashboard')
  } catch (err) {
    // Display a more user-friendly error message
    error.value = 'Invalid email or password. Try company@link.ai or freelancer@link.ai with password: password'
  } finally {
    loading.value = false
  }
}
</script>
