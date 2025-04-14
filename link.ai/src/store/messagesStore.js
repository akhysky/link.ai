import { defineStore } from 'pinia'
import api from '../services/api'
import { useUserStore } from './userStore'

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    conversations: [],
    currentConversation: null,
    messages: [],
    contacts: [],
    loading: false,
    error: null,
    unreadCount: 0
  }),
  
  getters: {
    getConversations: (state) => state.conversations,
    getCurrentConversation: (state) => state.currentConversation,
    getMessages: (state) => state.messages,
    getContacts: (state) => state.contacts,
    getUnreadCount: (state) => state.unreadCount
  },
  
  actions: {
    async fetchConversations() {
      const userStore = useUserStore()
      if (!userStore.isLoggedIn) return
      
      this.loading = true
      this.error = null
      
      try {
        const userId = userStore.user.id
        const conversations = await api.messages.getConversations(userId)
        
        this.conversations = conversations
        this.unreadCount = conversations.reduce((count, conv) => count + conv.unreadCount, 0)
      } catch (error) {
        this.error = error.message
        console.error('Error fetching conversations:', error)
      } finally {
        this.loading = false
      }
    },
    
    async fetchConversation(contactId) {
      const userStore = useUserStore()
      if (!userStore.isLoggedIn) return
      
      this.loading = true
      this.error = null
      
      try {
        const userId = userStore.user.id
        
        // Find the conversation partner
        const partner = await api.users.getById(contactId)
        this.currentConversation = { partnerId: contactId, partner }
        
        // Get messages
        const messages = await api.messages.getConversation(userId, contactId)
        this.messages = messages
        
        // Mark unread messages as read
        const unreadMessageIds = messages
          .filter(msg => msg.receiverId === userId && !msg.read)
          .map(msg => msg.id)
        
        if (unreadMessageIds.length > 0) {
          await api.messages.markAsRead(unreadMessageIds)
          
          // Update unread count in conversations
          const conversationIndex = this.conversations.findIndex(c => c.partnerId === contactId)
          if (conversationIndex !== -1) {
            this.unreadCount -= this.conversations[conversationIndex].unreadCount
            this.conversations[conversationIndex].unreadCount = 0
            
            // Update read status in messages
            this.conversations[conversationIndex].messages.forEach(msg => {
              if (unreadMessageIds.includes(msg.id)) {
                msg.read = true
              }
            })
          }
        }
      } catch (error) {
        this.error = error.message
        console.error(`Error fetching conversation with ${contactId}:`, error)
      } finally {
        this.loading = false
      }
    },
    
    async sendMessage(text, receiverId) {
      const userStore = useUserStore()
      if (!userStore.isLoggedIn) return
      
      this.loading = true
      this.error = null
      
      try {
        const userId = userStore.user.id
        
        const message = {
          senderId: userId,
          receiverId,
          text,
          timestamp: new Date().toISOString(),
          read: false
        }
        
        const result = await api.messages.sendMessage(message)
        
        // Add message to current conversation
        if (this.currentConversation && this.currentConversation.partnerId === receiverId) {
          this.messages.push({ ...message, id: result.id })
        }
        
        // Add contact if not already in contacts
        await api.contacts.addContact(userId, receiverId)
        await api.contacts.addContact(receiverId, userId)
        
        // Update conversations list
        await this.fetchConversations()
        
        return result
      } catch (error) {
        this.error = error.message
        console.error('Error sending message:', error)
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async fetchContacts() {
      const userStore = useUserStore()
      if (!userStore.isLoggedIn) return
      
      this.loading = true
      this.error = null
      
      try {
        const userId = userStore.user.id
        const contacts = await api.contacts.getContacts(userId)
        this.contacts = contacts
      } catch (error) {
        this.error = error.message
        console.error('Error fetching contacts:', error)
      } finally {
        this.loading = false
      }
    },
    
    async addContact(contactId) {
      const userStore = useUserStore()
      if (!userStore.isLoggedIn) return
      
      this.loading = true
      this.error = null
      
      try {
        const userId = userStore.user.id
        await api.contacts.addContact(userId, contactId)
        
        // Refresh contacts
        await this.fetchContacts()
      } catch (error) {
        this.error = error.message
        console.error('Error adding contact:', error)
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
