import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

export const useSuppliersStore = defineStore('suppliers', {
  state: () => ({
    suppliers: []
  }),
  actions: {
    async fetchSuppliers() {
      const siteurl = import.meta.env.VITE_API_URL
      const authStore = useAuthStore()

      try {
        // Attempt to fetch suppliers from API
        const response = await axios.get(`${siteurl}/api/suppliers/minilist`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${authStore.token}` // Ensure Bearer prefix for token
          },
          withCredentials: true // Include credentials (cookies)
        })

        if (response.status === 200) {
          const data = response.data

          if (Array.isArray(data.data)) {
            // Update the store's state with the fetched data
            this.suppliers = data.data
            // Save to localStorage for future use
            localStorage.setItem('suppliers', JSON.stringify(this.suppliers))
          } else {
            throw new Error('Data format is not as expected')
          }
        } else {
          throw new Error(`Network response was not ok: ${response.statusText}`)
        }
      } catch (error) {
        // Log the error and set error state
        console.error('Error fetching suppliers from network:', error)

        // Load suppliers from localStorage if network fetch fails
        const storedSuppliers = JSON.parse(localStorage.getItem('suppliers') || '[]')
        this.suppliers = storedSuppliers
      }
    }
  }
})
