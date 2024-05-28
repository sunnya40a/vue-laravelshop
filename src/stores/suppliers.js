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
        // Attempt to fetch suppliers from localStorage
        const storedSuppliers = JSON.parse(localStorage.getItem('suppliers') || '[]')

        // If suppliers are found in localStorage, use them
        if (storedSuppliers.length > 0) {
          this.suppliers = storedSuppliers
        } else {
          // If suppliers not found in localStorage, fetch from API
          const response = await axios.get(`${siteurl}/api/suppliers/minilist`, {
            headers: {
              Accept: 'application/json',
              Authorization: authStore.token
            },
            withCredentials: true // Include credentials (cookies)
          })

          if (response.status !== 200) {
            throw new Error('Failed to fetch suppliers')
          }

          const data = response.data

          if (Array.isArray(data.data)) {
            this.suppliers = data.data

            // Save to localStorage after successful fetch
            localStorage.setItem('suppliers', JSON.stringify(this.suppliers))
          } else {
            throw new Error('Data format is not as expected')
          }
        }
      } catch (error) {
        console.error('Error fetching suppliers:', error)
        // Optionally, you can add a notification or handle error in UI
      }
    }
  }
})
