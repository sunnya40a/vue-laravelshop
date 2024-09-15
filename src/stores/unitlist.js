import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

export const useUnitlistsStore = defineStore('unitlist', {
  state: () => ({
    unitlists: []
  }),
  actions: {
    async fetchUnitlists() {
      const siteurl = import.meta.env.VITE_API_URL
      const authStore = useAuthStore()

      try {
        // Attempt to fetch unitlists from the API
        const response = await axios.get(`${siteurl}/api/unitlist/list`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${authStore.token}` // Ensure Bearer prefix for token
          },
          withCredentials: true
        })

        if (response.status === 200) {
          const data = response.data

          if (Array.isArray(data.data)) {
            // Update the store's state with the fetched data
            this.unitlists = data.data
            // Save to localStorage for future use
            localStorage.setItem('unitlist', JSON.stringify(this.unitlists))
          } else {
            throw new Error('Data format is not as expected')
          }
        } else {
          throw new Error('Network response was not ok')
        }
      } catch (error) {
        // Log the error and fall back to localStorage
        console.error('Error fetching unitlists from network:', error)

        // Load unitlists from localStorage if network fetch fails
        const storedUnitlists = JSON.parse(localStorage.getItem('unitlist') || '[]')
        this.unitlists = storedUnitlists
      }
    }
  }
})
