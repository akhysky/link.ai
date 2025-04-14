<template>
  <MainLayout>
    <div class="container mx-auto py-8 px-4">
      <h1 class="text-3xl font-bold mb-8">Messages</h1>

      <div class="flex flex-col md:flex-row gap-6">
        <!-- Conversations List -->
        <div class="w-full md:w-1/3 bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-4 border-b">
            <h2 class="font-semibold text-lg">Conversations</h2>
          </div>

          <div v-if="loading" class="p-6 text-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p class="mt-2 text-gray-600">Chargement des conversations...</p>
          </div>

          <div v-else-if="conversations.length === 0" class="p-6 text-center text-gray-500">
            <p>Aucune conversation</p>
            <p class="text-sm mt-2">Contactez un professionnel pour commencer à discuter</p>
          </div>

          <div v-else class="divide-y">
            <div
              v-for="conversation in conversations"
              :key="conversation.partnerId"
              @click="selectConversation(conversation.partnerId)"
              class="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              :class="{ 'bg-gray-50': currentConversation?.partnerId === conversation.partnerId }"
            >
              <div class="flex items-center">
                <img
                  :src="conversation.partner?.avatar"
                  :alt="conversation.partner?.name"
                  class="w-12 h-12 rounded-full object-cover mr-4"
                >
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-center">
                    <h3 class="font-semibold truncate" :class="{ 'text-primary': conversation.unreadCount > 0 }">
                      {{ conversation.partner?.name }}
                    </h3>
                    <span class="text-xs text-gray-500">
                      {{ formatDate(conversation.lastMessage?.timestamp) }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 truncate" :class="{ 'font-semibold': conversation.unreadCount > 0 }">
                    {{ conversation.lastMessage?.text }}
                  </p>
                </div>
                <div v-if="conversation.unreadCount > 0" class="ml-2">
                  <span class="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {{ conversation.unreadCount }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Area -->
        <div class="w-full md:w-2/3 bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-[600px]">
          <div v-if="!currentConversation" class="flex-1 flex flex-col items-center justify-center text-gray-500 p-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p class="text-lg">Sélectionnez une conversation pour commencer à discuter</p>
          </div>

          <template v-else>
            <!-- Chat Header -->
            <div class="p-4 border-b flex items-center">
              <img
                :src="currentConversation.partner?.avatar"
                :alt="currentConversation.partner?.name"
                class="w-10 h-10 rounded-full object-cover mr-3"
              >
              <div>
                <h3 class="font-semibold">{{ currentConversation.partner?.name }}</h3>
                <p class="text-xs text-gray-500">
                  {{ currentConversation.partner?.accountType === 'freelancer' ? 'Freelance' : 'Entreprise' }}
                </p>
              </div>
            </div>

            <!-- Messages -->
            <div class="flex-1 p-4 overflow-y-auto" ref="messagesContainer">
              <div v-if="loading" class="flex justify-center my-4">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>

              <div v-else-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-gray-500">
                <p>Aucun message. Commencez la conversation !</p>
              </div>

              <div v-else class="space-y-4">
                <div v-for="(message, index) in messages" :key="index"
                     :class="[
                       'max-w-[80%] p-3 rounded-lg',
                       message.senderId === userId
                         ? 'bg-primary text-white ml-auto rounded-br-none'
                         : 'bg-gray-100 text-gray-800 rounded-bl-none'
                     ]">
                  <p>{{ message.text }}</p>
                  <p class="text-xs mt-1 opacity-70 text-right">
                    {{ formatTime(message.timestamp) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Message Input -->
            <div class="p-4 border-t">
              <form @submit.prevent="sendMessage" class="flex">
                <input
                  type="text"
                  v-model="newMessage"
                  placeholder="Tapez votre message..."
                  class="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                <button
                  type="submit"
                  class="bg-primary text-white p-2 rounded-r-md hover:bg-opacity-90 transition-all"
                  :disabled="!newMessage.trim() || sending"
                >
                  <svg v-if="!sending" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <div v-else class="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                </button>
              </form>
            </div>
          </template>
        </div>
      </div>

      <!-- Contacts Section -->
      <div class="mt-10">
        <h2 class="text-2xl font-bold mb-4">Contacts</h2>

        <div v-if="loadingContacts" class="p-6 text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p class="mt-2 text-gray-600">Chargement des contacts...</p>
        </div>

        <div v-else-if="contacts.length === 0" class="p-6 text-center text-gray-500 bg-white rounded-lg shadow-md">
          <p>Aucun contact</p>
          <p class="text-sm mt-2">Les personnes que vous contactez apparaîtront ici</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="contact in contacts"
            :key="contact.id"
            class="bg-white rounded-lg shadow-md p-4 flex items-center"
          >
            <img
              :src="contact.avatar"
              :alt="contact.name"
              class="w-16 h-16 rounded-full object-cover mr-4"
            >
            <div class="flex-1">
              <h3 class="font-semibold text-lg">{{ contact.name }}</h3>
              <p class="text-sm text-gray-600">
                {{ contact.accountType === 'freelancer' ? 'Freelance' : 'Entreprise' }}
              </p>
              <div class="mt-2 flex space-x-2">
                <button
                  @click="selectConversation(contact.id)"
                  class="text-primary text-sm hover:underline flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Message
                </button>
                <router-link
                  :to="`/${contact.accountType === 'freelancer' ? 'profile' : 'company'}/${contact.id}`"
                  class="text-gray-600 text-sm hover:underline flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Voir profil
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useUserStore } from '../store/userStore'
import { useMessagesStore } from '../store/messagesStore'
import MainLayout from '../components/layout/MainLayout.vue'

const userStore = useUserStore()
const messagesStore = useMessagesStore()

const messagesContainer = ref(null)
const newMessage = ref('')
const sending = ref(false)

// Computed properties
const userId = computed(() => userStore.user?.id)
const loading = computed(() => messagesStore.loading)
const loadingContacts = ref(false)
const conversations = computed(() => messagesStore.getConversations)
const currentConversation = computed(() => messagesStore.getCurrentConversation)
const messages = computed(() => messagesStore.getMessages)
const contacts = computed(() => messagesStore.getContacts)

// Methods
const selectConversation = async (partnerId) => {
  await messagesStore.fetchConversation(partnerId)
}

const sendMessage = async () => {
  if (!newMessage.value.trim() || !currentConversation.value) return

  sending.value = true
  try {
    await messagesStore.sendMessage(newMessage.value, currentConversation.value.partnerId)
    newMessage.value = ''
  } catch (error) {
    console.error('Error sending message:', error)
  } finally {
    sending.value = false
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return ''

  const date = new Date(timestamp)
  const now = new Date()
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return formatTime(timestamp)
  } else if (diffDays === 1) {
    return 'Hier'
  } else if (diffDays < 7) {
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
    return days[date.getDay()]
  } else {
    return date.toLocaleDateString()
  }
}

const formatTime = (timestamp) => {
  if (!timestamp) return ''

  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Lifecycle hooks
onMounted(async () => {
  if (userStore.isLoggedIn) {
    await messagesStore.fetchConversations()

    loadingContacts.value = true
    await messagesStore.fetchContacts()
    loadingContacts.value = false
  }
})

// Auto-scroll to bottom when new messages arrive
watch(() => messages.value.length, async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
})
</script>
