<template>
  <nav class="bg-white shadow-md">
    <div class="container-custom py-4">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="text-2xl font-bold text-primary">
            link<span class="text-dark">.ai</span>
          </router-link>
        </div>

        <!-- Search Bar -->
        <div class="hidden md:block flex-1 mx-10">
          <div class="relative">
            <input
              type="text"
              placeholder="Rechercher des services IA..."
              class="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              v-model="searchQuery"
              @keyup.enter="handleSearch"
            />
            <button
              class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              @click="handleSearch"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link to="/services" class="text-secondary hover:text-primary transition-colors">
            Explorer
          </router-link>
          <router-link v-if="!isLoggedIn" to="/login" class="text-secondary hover:text-primary transition-colors">
            Connexion
          </router-link>
          <router-link v-if="!isLoggedIn" to="/register" class="btn-primary">
            S'inscrire
          </router-link>
          <!-- Chat Icon for logged in users -->
          <div v-if="isLoggedIn" class="relative">
            <button
              @click="toggleChatDropdown"
              class="text-secondary hover:text-primary transition-colors p-1 relative chat-button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <!-- Notification Badge -->
              <span v-if="unreadMessages > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {{ unreadMessages > 9 ? '9+' : unreadMessages }}
              </span>
            </button>

            <!-- Chat Dropdown -->
            <div v-if="isChatDropdownOpen" class="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 chat-dropdown">
              <div class="p-3 border-b">
                <h3 class="font-semibold text-gray-700">Messages</h3>
              </div>

              <div v-if="messagesStore.loading" class="p-4 text-center">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                <p class="mt-2 text-gray-600">Chargement...</p>
              </div>

              <div v-else-if="conversations.length === 0" class="p-4 text-center text-gray-500">
                <p>Aucune conversation récente</p>
              </div>

              <div v-else class="max-h-96 overflow-y-auto">
                <div
                  v-for="conversation in conversations"
                  :key="conversation.partnerId"
                  @click="openChat(conversation)"
                  class="p-3 hover:bg-gray-100 cursor-pointer border-b flex items-center"
                >
                  <img :src="conversation.partner?.avatar" :alt="conversation.partner?.name" class="w-10 h-10 rounded-full object-cover mr-3">
                  <div class="flex-1 min-w-0">
                    <div class="flex justify-between items-center">
                      <h4 class="font-semibold text-gray-800 truncate">{{ conversation.partner?.name }}</h4>
                      <span class="text-xs text-gray-500">{{ formatDate(conversation.lastMessage?.timestamp) }}</span>
                    </div>
                    <p class="text-sm text-gray-600 truncate" :class="{ 'font-semibold': conversation.unreadCount > 0 }">
                      {{ conversation.lastMessage?.text }}
                    </p>
                  </div>
                  <span v-if="conversation.unreadCount > 0" class="ml-2 bg-primary w-2 h-2 rounded-full"></span>
                </div>
              </div>

              <div class="p-2 text-center border-t">
                <router-link to="/messages" class="text-primary text-sm hover:underline">
                  Voir tous les messages
                </router-link>
              </div>
            </div>
          </div>
          <div v-if="isLoggedIn" class="relative">
            <button
              @click="toggleUserMenu"
              class="flex items-center space-x-1 focus:outline-none"
            >
              <img
                :src="user?.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'"
                alt="User Avatar"
                class="w-8 h-8 rounded-full object-cover"
              />
              <span class="text-secondary">{{ user?.name || 'User' }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-if="isUserMenuOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 user-dropdown"
            >
              <router-link to="/dashboard" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Tableau de bord
              </router-link>
              <router-link :to="`/profile/${user?.id}`" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profil
              </router-link>
              <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button class="md:hidden focus:outline-none" @click="toggleMobileMenu">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden mt-4 pb-4">
        <div class="flex flex-col space-y-4">
          <div class="relative">
            <input
              type="text"
              placeholder="Rechercher des services IA..."
              class="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              v-model="searchQuery"
              @keyup.enter="handleSearch"
            />
            <button
              class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              @click="handleSearch"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <router-link to="/services" class="text-secondary hover:text-primary transition-colors">
            Explorer
          </router-link>
          <template v-if="!isLoggedIn">
            <router-link to="/login" class="text-secondary hover:text-primary transition-colors">
              Connexion
            </router-link>
            <router-link to="/register" class="btn-primary text-center">
              S'inscrire
            </router-link>
          </template>
          <template v-else>
            <!-- Chat Button for Mobile -->
            <button
              @click="toggleChatDropdown"
              class="text-secondary hover:text-primary transition-colors flex items-center space-x-2"
            >
              <span>Messages</span>
              <div class="relative">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span v-if="unreadMessages > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {{ unreadMessages > 9 ? '9+' : unreadMessages }}
                </span>
              </div>
            </button>

            <router-link to="/dashboard" class="text-secondary hover:text-primary transition-colors">
              Tableau de bord
            </router-link>
            <router-link :to="`/profile/${user?.id}`" class="text-secondary hover:text-primary transition-colors">
              Profil
            </router-link>
            <button @click="logout" class="text-left text-secondary hover:text-primary transition-colors">
              Déconnexion
            </button>
          </template>
        </div>
      </div>
    </div>
  </nav>

  <!-- Chat Modal -->
  <ChatModal
    v-if="isChatModalOpen"
    :is-open="isChatModalOpen"
    :recipient="currentChatRecipient"
    @close="closeChat"
    @send-message="handleSendMessage"
  />
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../store/userStore'
import { useMessagesStore } from '../../store/messagesStore'
import ChatModal from '../chat/ChatModal.vue'

const router = useRouter()
const userStore = useUserStore()
const messagesStore = useMessagesStore()

const mobileMenuOpen = ref(false)
const searchQuery = ref('')

// Chat related state
const isChatDropdownOpen = ref(false)
const isChatModalOpen = ref(false)
const currentChatRecipient = ref(null)

// User menu state
const isUserMenuOpen = ref(false)

// Get conversations and unread count from store
const conversations = computed(() => messagesStore.getConversations)
const unreadMessages = computed(() => messagesStore.getUnreadCount)

const isLoggedIn = computed(() => userStore.isLoggedIn)
const user = computed(() => userStore.getUser)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/services',
      query: { search: searchQuery.value }
    })
    mobileMenuOpen.value = false
  }
}

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value

  // Close chat dropdown if open
  if (isUserMenuOpen.value && isChatDropdownOpen.value) {
    isChatDropdownOpen.value = false
  }
}

const logout = () => {
  userStore.logout()
  router.push('/')
  mobileMenuOpen.value = false
  isUserMenuOpen.value = false
}

// Chat functions
const toggleChatDropdown = async () => {
  // Fetch conversations when opening dropdown
  if (!isChatDropdownOpen.value && userStore.isLoggedIn) {
    await messagesStore.fetchConversations()
  }

  isChatDropdownOpen.value = !isChatDropdownOpen.value
}

const openChat = async (conversation) => {
  // If conversation is an object with partnerId
  if (conversation.partnerId) {
    currentChatRecipient.value = conversation.partner
  } else {
    // If conversation is just the user object
    currentChatRecipient.value = conversation
  }

  isChatModalOpen.value = true
  isChatDropdownOpen.value = false

  // Fetch conversation messages
  if (currentChatRecipient.value) {
    await messagesStore.fetchConversation(currentChatRecipient.value.id)
  }
}

const closeChat = () => {
  isChatModalOpen.value = false
}

const handleSendMessage = async (message) => {
  if (currentChatRecipient.value) {
    await messagesStore.sendMessage(message.text, currentChatRecipient.value.id)
  }
}

// Close dropdowns when clicking outside
onMounted(async () => {
  document.addEventListener('click', (event) => {
    const target = event.target

    // Handle chat dropdown
    const chatDropdown = document.querySelector('.chat-dropdown')
    const chatButton = document.querySelector('.chat-button')

    if (chatDropdown && !chatDropdown.contains(target) && chatButton && !chatButton.contains(target)) {
      isChatDropdownOpen.value = false
    }

    // Handle user dropdown
    const userDropdown = document.querySelector('.user-dropdown')
    const userButton = userDropdown?.previousElementSibling

    if (userDropdown && !userDropdown.contains(target) && userButton && !userButton.contains(target)) {
      isUserMenuOpen.value = false
    }
  })

  // Fetch conversations on mount if user is logged in
  if (userStore.isLoggedIn) {
    await messagesStore.fetchConversations()
  }
})

// Watch for login state changes
watch(() => userStore.isLoggedIn, async (isLoggedIn) => {
  if (isLoggedIn) {
    await messagesStore.fetchConversations()
  }
})

// Helper function to format dates
const formatDate = (timestamp) => {
  if (!timestamp) return ''

  const date = new Date(timestamp)
  const now = new Date()
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } else if (diffDays === 1) {
    return 'Hier'
  } else if (diffDays < 7) {
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
    return days[date.getDay()]
  } else {
    return date.toLocaleDateString()
  }
}
</script>
