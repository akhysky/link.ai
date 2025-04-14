<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-50" @click="close"></div>

    <!-- Modal -->
    <div class="relative bg-white rounded-lg shadow-xl w-full max-w-2xl h-[600px] flex flex-col">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b">
        <div class="flex items-center">
          <img :src="recipient.avatar" :alt="recipient.name" class="w-10 h-10 rounded-full object-cover mr-3">
          <div>
            <h3 class="font-semibold text-lg">{{ recipient.name }}</h3>
            <p class="text-sm text-gray-500">{{ recipient.accountType === 'freelancer' ? 'Freelance' : 'Entreprise' }}</p>
          </div>
        </div>
        <button @click="close" class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Chat Messages -->
      <div class="flex-1 p-4 overflow-y-auto" ref="messagesContainer">
        <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p>Commencez la conversation avec {{ recipient.name }}</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="(message, index) in messages" :key="index"
               :class="[
                 'max-w-[80%] p-3 rounded-lg',
                 message.sender === 'user'
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
            :disabled="!newMessage.trim()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import { useUserStore } from '../../store/userStore'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  recipient: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'send-message'])

const userStore = useUserStore()
const messagesContainer = ref(null)
const newMessage = ref('')
const messages = ref([])

// Simulate initial message after a delay
onMounted(() => {
  if (props.recipient && props.isOpen) {
    setTimeout(() => {
      messages.value.push({
        sender: 'recipient',
        text: `Bonjour ! Je suis ${props.recipient.name}. Comment puis-je vous aider avec votre projet IA ?`,
        timestamp: new Date()
      })
    }, 1000)
  }
})

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  // Add user message
  const userMessage = {
    sender: 'user',
    text: newMessage.value,
    timestamp: new Date()
  }

  messages.value.push(userMessage)
  emit('send-message', userMessage)

  // Clear input
  newMessage.value = ''

  // Simulate recipient response after a delay
  setTimeout(() => {
    const recipientMessage = {
      sender: 'recipient',
      text: getAutoResponse(),
      timestamp: new Date()
    }
    messages.value.push(recipientMessage)
  }, 1000 + Math.random() * 2000) // Random delay between 1-3 seconds
}

const getAutoResponse = () => {
  const responses = [
    `Merci pour votre message ! Je serais ravi de discuter plus en détail de votre projet.`,
    `C'est un projet intéressant ! Pourriez-vous me donner plus de détails sur vos besoins spécifiques ?`,
    `Je comprends vos besoins. Je peux vous proposer une solution personnalisée adaptée à votre situation.`,
    `Excellente question ! Je vais vous expliquer comment nous pourrions aborder ce défi.`,
    `Je suis disponible pour une consultation plus approfondie si vous le souhaitez.`
  ]

  return responses[Math.floor(Math.random() * responses.length)]
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const close = () => {
  emit('close')
}

// Auto-scroll to bottom when new messages arrive
watch(() => messages.value.length, async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
})
</script>
