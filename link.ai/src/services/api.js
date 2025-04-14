import mockSupabase from './mockSupabase'

// In a real application, you would import the actual Supabase client
// import supabase from './supabase'

// Use the mock Supabase client for demonstration
const supabase = mockSupabase

// API service for interacting with the database
const api = {
  // Auth methods
  auth: {
    login: async (email, password) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw new Error(error.message)
      return data
    },

    register: async (email, password, userData) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      })

      if (error) throw new Error(error.message)
      return data
    },

    logout: async () => {
      const { error } = await supabase.auth.signOut()
      if (error) throw new Error(error.message)
    },

    getCurrentUser: async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) throw new Error(error.message)
      return data.session?.user
    }
  },

  // User methods
  users: {
    getById: async (id) => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)

      if (error) throw new Error(error.message)
      return data[0]
    },

    update: async (id, userData) => {
      const { data, error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', id)

      if (error) throw new Error(error.message)
      return data
    }
  },

  // Services methods
  services: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw new Error(error.message)

      // Fetch user data for each service
      const servicesWithUsers = await Promise.all(
        data.map(async (service) => {
          const user = await api.users.getById(service.userId)
          return {
            ...service,
            user: {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
              rating: 4.8 // Mock rating
            }
          }
        })
      )

      return servicesWithUsers
    },

    getById: async (id) => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)

      if (error) throw new Error(error.message)
      if (!data.length) return null

      // Fetch user data
      const user = await api.users.getById(data[0].userId)

      return {
        ...data[0],
        user: {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          rating: 4.8 // Mock rating
        }
      }
    },

    search: async (query) => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .ilike('title', `%${query}%`)

      if (error) throw new Error(error.message)

      // Fetch user data for each service
      const servicesWithUsers = await Promise.all(
        data.map(async (service) => {
          const user = await api.users.getById(service.userId)
          return {
            ...service,
            user: {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
              rating: 4.8 // Mock rating
            }
          }
        })
      )

      return servicesWithUsers
    },

    create: async (serviceData) => {
      const { data, error } = await supabase
        .from('services')
        .insert(serviceData)

      if (error) throw new Error(error.message)
      return data
    }
  },

  // Jobs methods
  jobs: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw new Error(error.message)

      // Fetch company data for each job
      const jobsWithCompanies = await Promise.all(
        data.map(async (job) => {
          const company = await api.users.getById(job.userId)
          return {
            ...job,
            company: {
              id: company.id,
              name: company.name,
              logo: company.avatar,
              description: company.description || 'A company looking for AI talent',
              location: company.location || 'Remote'
            }
          }
        })
      )

      return jobsWithCompanies
    },

    getById: async (id) => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)

      if (error) throw new Error(error.message)
      if (!data.length) return null

      // Fetch company data
      const company = await api.users.getById(data[0].userId)

      return {
        ...data[0],
        company: {
          id: company.id,
          name: company.name,
          logo: company.avatar,
          description: company.description || 'A company looking for AI talent',
          location: company.location || 'Remote'
        }
      }
    },

    search: async (query) => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .ilike('title', `%${query}%`)

      if (error) throw new Error(error.message)

      // Fetch company data for each job
      const jobsWithCompanies = await Promise.all(
        data.map(async (job) => {
          const company = await api.users.getById(job.userId)
          return {
            ...job,
            company: {
              id: company.id,
              name: company.name,
              logo: company.avatar,
              description: company.description || 'A company looking for AI talent',
              location: company.location || 'Remote'
            }
          }
        })
      )

      return jobsWithCompanies
    },

    create: async (jobData) => {
      const { data, error } = await supabase
        .from('jobs')
        .insert(jobData)

      if (error) throw new Error(error.message)
      return data
    },

    apply: async (jobId, applicationData) => {
      const application = {
        jobId,
        ...applicationData,
        status: 'pending'
      }

      const { data, error } = await supabase
        .from('applications')
        .insert(application)

      if (error) throw new Error(error.message)

      // Update job applications count
      const job = await api.jobs.getById(jobId)
      await supabase
        .from('jobs')
        .update({ applications: (job.applications || 0) + 1 })
        .eq('id', jobId)

      return data
    }
  },

  // Categories
  categories: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')

      if (error) throw new Error(error.message)
      return data
    }
  },

  // Messages
  messages: {
    getConversation: async (userId, contactId) => {
      // Get all messages
      const { data, error } = await supabase
        .from('messages')
        .select('*')

      if (error) throw new Error(error.message)

      // Filter to only include messages between these two users
      return data.filter(message =>
        (message.senderId === userId && message.receiverId === contactId) ||
        (message.senderId === contactId && message.receiverId === userId)
      ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    },

    getConversations: async (userId) => {
      // Get all messages where user is sender or receiver
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`senderId.eq.${userId},receiverId.eq.${userId}`)
        .order('timestamp', { ascending: false })

      if (error) throw new Error(error.message)

      // Group messages by conversation partner
      const conversations = {}

      for (const message of data) {
        const partnerId = message.senderId === userId ? message.receiverId : message.senderId

        if (!conversations[partnerId]) {
          conversations[partnerId] = {
            partnerId,
            messages: [],
            lastMessage: null,
            unreadCount: 0
          }
        }

        conversations[partnerId].messages.push(message)

        // Track unread messages
        if (message.receiverId === userId && !message.read) {
          conversations[partnerId].unreadCount++
        }

        // Update last message if this is the most recent
        if (!conversations[partnerId].lastMessage ||
            new Date(message.timestamp) > new Date(conversations[partnerId].lastMessage.timestamp)) {
          conversations[partnerId].lastMessage = message
        }
      }

      // Convert to array and fetch partner details
      const conversationsArray = Object.values(conversations)

      // Fetch user details for each conversation partner
      const conversationsWithUsers = await Promise.all(
        conversationsArray.map(async (conversation) => {
          const partner = await api.users.getById(conversation.partnerId)
          return {
            ...conversation,
            partner
          }
        })
      )

      return conversationsWithUsers
    },

    sendMessage: async (message) => {
      const { data, error } = await supabase
        .from('messages')
        .insert(message)

      if (error) throw new Error(error.message)
      return data
    },

    markAsRead: async (messageIds) => {
      const { data, error } = await supabase
        .from('messages')
        .update({ read: true })
        .in('id', messageIds)

      if (error) throw new Error(error.message)
      return data
    }
  },

  // Contacts
  contacts: {
    getContacts: async (userId) => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('userId', userId)

      if (error) throw new Error(error.message)
      if (!data.length) return []

      const contactIds = data[0].contactIds || []

      // Fetch user details for each contact
      const contacts = await Promise.all(
        contactIds.map(async (contactId) => {
          return await api.users.getById(contactId)
        })
      )

      return contacts
    },

    addContact: async (userId, contactId) => {
      // First check if contact entry exists
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('userId', userId)

      if (error) throw new Error(error.message)

      if (data.length === 0) {
        // Create new contact entry
        const { error: insertError } = await supabase
          .from('contacts')
          .insert({ userId, contactIds: [contactId] })

        if (insertError) throw new Error(insertError.message)
      } else {
        // Update existing contact entry
        const contactIds = [...new Set([...data[0].contactIds, contactId])]

        const { error: updateError } = await supabase
          .from('contacts')
          .update({ contactIds })
          .eq('userId', userId)

        if (updateError) throw new Error(updateError.message)
      }

      return { success: true }
    }
  }
}

export default api
