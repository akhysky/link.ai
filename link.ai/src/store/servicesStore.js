import { defineStore } from 'pinia'
import api from '../services/api'

export const useServicesStore = defineStore('services', {
  state: () => ({
    services: [],
    loading: false,
    error: null,
    categories: [
      'Développement IA',
      'Apprentissage Automatique',
      'Science des Données',
      'Vision par Ordinateur',
      'Traitement du Langage Naturel',
      'Développement de Chatbot',
      'Intégration IA',
      'Conseil en IA'
    ]
  }),

  getters: {
    getAllServices: (state) => state.services,
    getServiceById: (state) => (id) => state.services.find(service => service.id === id),
    getServicesByCategory: (state) => (category) =>
      state.services.filter(service => service.category === category),
    getCategories: (state) => state.categories
  },

  actions: {
    async fetchServices() {
      this.loading = true
      this.error = null

      try {
        const services = await api.services.getAll()
        this.services = services
      } catch (error) {
        this.error = error.message
        console.error('Error fetching services:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchServiceById(id) {
      this.loading = true
      this.error = null

      try {
        const service = await api.services.getById(id)
        return service
      } catch (error) {
        this.error = error.message
        console.error(`Error fetching service ${id}:`, error)
        return null
      } finally {
        this.loading = false
      }
    },

    async searchServices(query) {
      this.loading = true
      this.error = null

      try {
        const services = await api.services.search(query)
        this.services = services
      } catch (error) {
        this.error = error.message
        console.error('Error searching services:', error)
      } finally {
        this.loading = false
      }
    },

    async createService(serviceData) {
      this.loading = true
      this.error = null

      try {
        const newService = await api.services.create(serviceData)
        this.services.unshift(newService)
        return newService
      } catch (error) {
        this.error = error.message
        console.error('Error creating service:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchCategories() {
      try {
        const categories = await api.categories.getAll()
        if (categories && categories.length > 0) {
          this.categories = categories
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
        // Keep using the default categories if there's an error
      }
    }
  }
})
