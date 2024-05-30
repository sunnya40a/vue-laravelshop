// stores/itemlists.js
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
        const storedItemlists = JSON.parse(localStorage.getItem('itemlists') || '[]')

        if (storedItemlists.length > 0) {
          this.itemlists = storedItemlists
        } else {
          const response = await axios.get(`${siteurl}/api/inventory/itemlist`, {
            headers: {
              Accept: 'application/json',
              Authorization: authStore.token
            },
            withCredentials: true
          })

          if (response.status !== 200) {
            throw new Error('Failed to fetch itemlists')
          }

          const data = response.data

          if (Array.isArray(data.data)) {
            this.itemlists = data.data
            localStorage.setItem('itemlists', JSON.stringify(this.itemlists))
          } else {
            throw new Error('Data format is not as expected')
          }
        }
      } catch (error) {
        console.error('Error fetching itemlists:', error)
      }
    }
  }
})
