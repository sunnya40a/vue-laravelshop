// src/stores/categories.js
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: JSON.parse(localStorage.getItem('categories') || '[]')
  }),
  actions: {
    async fetchCategories() {
      const authStore = useAuthStore()
      try {
        const response = await fetch('http://localhost:8000/api/categories/list', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authStore.token
          },
          credentials: 'include'
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        console.log('Fetched categories data:', data)

        if (Array.isArray(data.data)) {
          this.categories = data.data.map((category) => category.description)
          localStorage.setItem('categories', JSON.stringify(this.categories)) // Save to local storage
          console.log('Mapped categories:', this.categories)
        } else {
          throw new Error('Data format is not as expected')
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
  }
})
