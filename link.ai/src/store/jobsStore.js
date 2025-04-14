import { defineStore } from 'pinia'
import api from '../services/api'

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobs: [],
    loading: false,
    error: null
  }),

  getters: {
    getAllJobs: (state) => state.jobs,
    getJobById: (state) => (id) => state.jobs.find(job => job.id === id),
    getJobsByCompany: (state) => (companyId) =>
      state.jobs.filter(job => job.company.id === companyId)
  },

  actions: {
    async fetchJobs() {
      this.loading = true
      this.error = null

      try {
        const jobs = await api.jobs.getAll()
        this.jobs = jobs
      } catch (error) {
        this.error = error.message
        console.error('Error fetching jobs:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchJobById(id) {
      this.loading = true
      this.error = null

      try {
        const job = await api.jobs.getById(id)
        return job
      } catch (error) {
        this.error = error.message
        console.error(`Error fetching job ${id}:`, error)
        return null
      } finally {
        this.loading = false
      }
    },

    async searchJobs(query) {
      this.loading = true
      this.error = null

      try {
        const jobs = await api.jobs.search(query)
        this.jobs = jobs
      } catch (error) {
        this.error = error.message
        console.error('Error searching jobs:', error)
      } finally {
        this.loading = false
      }
    },

    async createJob(jobData) {
      this.loading = true
      this.error = null

      try {
        const newJob = await api.jobs.create(jobData)
        this.jobs.unshift(newJob)
        return newJob
      } catch (error) {
        this.error = error.message
        console.error('Error creating job:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async applyForJob(jobId, application) {
      this.loading = true
      this.error = null

      try {
        const result = await api.jobs.apply(jobId, application)

        // Update the job in the local state
        const jobIndex = this.jobs.findIndex(job => job.id === jobId)
        if (jobIndex !== -1) {
          this.jobs[jobIndex].applications += 1
        }

        return { success: true, message: 'Application submitted successfully' }
      } catch (error) {
        this.error = error.message
        console.error(`Error applying for job ${jobId}:`, error)
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
