import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [] // Initialize with an empty array
  }),
  actions: {
    async fetchCategories() {
      const siteurl = import.meta.env.VITE_API_URL
      const authStore = useAuthStore()

      try {
        // Attempt to fetch categories from the network
        const response = await axios.get(`${siteurl}/api/categories/list`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${authStore.token}`
          },
          withCredentials: true // Include credentials (cookies)
        })

        if (response.status === 200) {
          const data = response.data

          if (Array.isArray(data.data)) {
            // Update the store's state with the fetched data
            this.categories = data.data
            // Save to localStorage for future use
            localStorage.setItem('categories', JSON.stringify(this.categories))
          } else {
            throw new Error('Data format is not as expected')
          }
        } else {
          throw new Error('Network response was not ok')
        }
      } catch (error) {
        // Log the error and fall back to localStorage
        console.error('Error fetching categories from network:', error)

        // Load categories from localStorage if network fetch fails
        const storedCategories = JSON.parse(localStorage.getItem('categories') || '[]')
        this.categories = storedCategories
      }
    }
  }
})
