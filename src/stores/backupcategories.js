// src/stores/categories.js
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: JSON.parse(localStorage.getItem('categories') || '[]')
  }),
  actions: {
    async fetchCategories() {
      const siteurl = import.meta.env.VITE_API_URL
      const authStore = useAuthStore()

      // Attempt to fetch categories from localStorage
      const storedCategories = JSON.parse(localStorage.getItem('categories') || '[]')

      if (storedCategories.length > 0) {
        this.categories = storedCategories
        return
      }

      try {
        const response = await axios.get(`${siteurl}/api/categories/list`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${authStore.token}`
          },
          withCredentials: true // Include credentials (cookies)
        })

        if (response.status !== 200) {
          throw new Error('Network response was not ok')
        }

        const data = response.data

        if (Array.isArray(data.data)) {
          this.categories = data.data // Assuming data.data is an array of strings
          // Save to localStorage after successful fetch
          localStorage.setItem('categories', JSON.stringify(this.categories))
        } else {
          throw new Error('Data format is not as expected')
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
  }
})
