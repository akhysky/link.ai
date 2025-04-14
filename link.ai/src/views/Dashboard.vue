<template>
  <MainLayout>
    <div class="bg-white min-h-screen py-8">
      <div class="container-custom">
        <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div class="flex items-center mb-4 md:mb-0">
              <img
                :src="user?.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'"
                :alt="user?.name"
                class="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h1 class="text-2xl font-bold text-dark">Welcome, {{ user?.name || 'User' }}!</h1>
                <p class="text-gray-600">{{ user?.accountType === 'freelancer' ? 'AI Freelancer' : 'Client' }}</p>
              </div>
            </div>
            <div class="flex space-x-4">
              <router-link :to="`/profile/${user?.id}`" class="btn-secondary">
                View Profile
              </router-link>
              <button class="btn-primary">
                {{ user?.accountType === 'freelancer' ? 'Create a Service' : 'Post a Project' }}
              </button>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-dark">Active Orders</h2>
              <span class="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                3
              </span>
            </div>
            <p class="text-gray-600 mb-4">You have 3 active orders in progress</p>
            <router-link to="/orders" class="text-primary font-medium hover:underline">
              View All Orders
            </router-link>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-dark">Messages</h2>
              <span class="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                5 new
              </span>
            </div>
            <p class="text-gray-600 mb-4">You have 5 unread messages</p>
            <router-link to="/messages" class="text-primary font-medium hover:underline">
              View Messages
            </router-link>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-dark">Earnings</h2>
              <span class="text-dark font-semibold">
                $1,250
              </span>
            </div>
            <p class="text-gray-600 mb-4">Your earnings this month</p>
            <router-link to="/earnings" class="text-primary font-medium hover:underline">
              View Earnings
            </router-link>
          </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 class="text-xl font-semibold text-dark mb-6">Recent Orders</h2>
              
              <div v-if="orders.length === 0" class="text-center py-8">
                <p class="text-gray-600">No orders yet</p>
              </div>
              
              <div v-else class="space-y-4">
                <div v-for="(order, index) in orders" :key="index" class="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="font-medium text-dark">{{ order.title }}</h3>
                      <p class="text-sm text-gray-600">Order #{{ order.id }} • {{ order.date }}</p>
                    </div>
                    <span class="px-3 py-1 rounded-full text-sm font-medium" :class="getStatusClass(order.status)">
                      {{ order.status }}
                    </span>
                  </div>
                  <div class="flex justify-between items-center mt-2">
                    <div class="flex items-center">
                      <img :src="order.client.avatar" :alt="order.client.name" class="w-8 h-8 rounded-full object-cover mr-2" />
                      <span class="text-sm text-gray-600">{{ order.client.name }}</span>
                    </div>
                    <span class="font-medium">${{ order.amount }}</span>
                  </div>
                </div>
              </div>
              
              <div class="mt-6 text-center" v-if="orders.length > 0">
                <router-link to="/orders" class="text-primary font-medium hover:underline">
                  View All Orders
                </router-link>
              </div>
            </div>
          </div>
          
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 class="text-xl font-semibold text-dark mb-6">Quick Actions</h2>
              
              <div class="space-y-3">
                <a href="#" class="flex items-center p-3 rounded-md hover:bg-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>{{ user?.accountType === 'freelancer' ? 'Create a Service' : 'Post a Project' }}</span>
                </a>
                
                <a href="#" class="flex items-center p-3 rounded-md hover:bg-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Check Messages</span>
                </a>
                
                <a href="#" class="flex items-center p-3 rounded-md hover:bg-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>Manage Orders</span>
                </a>
                
                <a href="#" class="flex items-center p-3 rounded-md hover:bg-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Account Settings</span>
                </a>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h2 class="text-xl font-semibold text-dark mb-6">Need Help?</h2>
              <p class="text-gray-600 mb-4">
                Our support team is here to help you with any questions or issues you may have.
              </p>
              <a href="#" class="btn-primary block text-center">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import MainLayout from '../components/layout/MainLayout.vue'
import { useUserStore } from '../store/userStore'

const userStore = useUserStore()
const user = computed(() => userStore.getUser)

// Mock orders data
const orders = ref([
  {
    id: 'ORD-1234',
    title: 'Custom AI Chatbot Development',
    date: 'Apr 2, 2023',
    status: 'In Progress',
    amount: 150,
    client: {
      name: 'Tech Solutions Inc.',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    }
  },
  {
    id: 'ORD-1233',
    title: 'Machine Learning Model Training',
    date: 'Mar 28, 2023',
    status: 'Completed',
    amount: 300,
    client: {
      name: 'Data Insights Co.',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    }
  },
  {
    id: 'ORD-1232',
    title: 'Computer Vision Implementation',
    date: 'Mar 25, 2023',
    status: 'Revision',
    amount: 250,
    client: {
      name: 'Vision AI Labs',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    }
  }
])

const getStatusClass = (status) => {
  switch (status) {
    case 'In Progress':
      return 'bg-blue-100 text-blue-600'
    case 'Completed':
      return 'bg-green-100 text-green-600'
    case 'Revision':
      return 'bg-yellow-100 text-yellow-600'
    case 'Cancelled':
      return 'bg-red-100 text-red-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

onMounted(() => {
  // Check if user is authenticated
  userStore.checkAuth()
})
</script>
