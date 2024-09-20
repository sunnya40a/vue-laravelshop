import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

export const useItemlistsStore = defineStore('itemlists', {
  state: () => ({
    itemlists: []
  }),
  actions: {
    async fetchItemlists() {
      const siteurl = import.meta.env.VITE_API_URL
      const authStore = useAuthStore()

      try {
        // Attempt to fetch itemlists from the API
        const response = await axios.get(`${siteurl}/api/inventory/minilist`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${authStore.token}` // Make sure the Bearer token format is correct
          },
          withCredentials: true
        })

        if (response.status !== 200) {
          throw new Error(`Failed to fetch itemlists, status code: ${response.status}`)
        }

        const data = response.data

        if (Array.isArray(data.data)) {
          this.itemlists = data.data
          localStorage.setItem('itemlists', JSON.stringify(this.itemlists)) // Store in localStorage after successful API call
        } else {
          throw new Error('Data format is not as expected. Received: ' + JSON.stringify(data))
        }
      } catch (error) {
        // Log the error
        //console.error('Error fetching itemlists from API:', error.message)

        if (error.response) {
          console.error('Response data:', error.response.data)
        }

        // Fallback to localStorage if the API call fails
        const storedItemlists = JSON.parse(localStorage.getItem('itemlists') || '[]')
        if (storedItemlists.length > 0) {
          this.itemlists = storedItemlists
        } else {
          console.error('No data in localStorage to fall back on.')
        }
      }
    }
  }
})
