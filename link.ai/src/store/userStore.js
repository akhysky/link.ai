import { defineStore } from 'pinia'
import api from '../services/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: null,
    loading: false,
    error: null
  }),

  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated
  },

  actions: {
    async login(email, password) {
      this.loading = true
      this.error = null

      try {
        const data = await api.auth.login(email, password)

        if (data.session) {
          this.setToken(data.session.access_token)

          // Get user details
          const user = await api.users.getById(data.user.id)
          this.setUser(user)

          return user
        }
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async register(userData) {
      this.loading = true
      this.error = null

      try {
        const { email, password, name, accountType } = userData

        const data = await api.auth.register(email, password, { name, accountType })

        if (data.session) {
          this.setToken(data.session.access_token)

          // Get user details
          const user = await api.users.getById(data.user.id)
          this.setUser(user)

          return user
        }
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    setUser(user) {
      this.user = user
      this.isAuthenticated = true

      // Store user type in localStorage for route guards
      if (user && user.accountType) {
        localStorage.setItem('userType', user.accountType)
      }
    },

    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },

    async logout() {
      try {
        await api.auth.logout()
      } catch (error) {
        console.error('Error during logout:', error)
      }

      this.user = null
      this.isAuthenticated = false
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('userType')
    },

    async checkAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        this.loading = true

        try {
          // Get current user from API
          const currentUser = await api.auth.getCurrentUser()

          if (currentUser) {
            const user = await api.users.getById(currentUser.id)
            this.setUser(user)
          } else {
            // If no current user but token exists, try to use stored userType
            const userType = localStorage.getItem('userType')
            if (userType) {
              const userId = userType === 'client' ? 101 : 102
              const user = await api.users.getById(userId)
              this.setUser(user)
            }
          }
        } catch (error) {
          console.error('Error checking auth:', error)
          this.logout()
        } finally {
          this.loading = false
        }
      }
    },

    async updateProfile(userData) {
      if (!this.user) return

      this.loading = true
      this.error = null

      try {
        const updatedUser = await api.users.update(this.user.id, userData)
        this.setUser({ ...this.user, ...updatedUser })
        return updatedUser
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
