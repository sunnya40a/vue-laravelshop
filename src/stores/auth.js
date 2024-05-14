import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Initial state of the store
    username: '',
    authorized: false,
    token: ''
  }),
  getters: {
    // Getter functions to access state properties
    getUsername(state) {
      return state.username
    },
    isAuthenticated(state) {
      return state.authorized
    },
    getToken(state) {
      return state.token
    }
  },
  actions: {
    // Action functions to modify state
    setUsername(newUsername) {
      this.username = newUsername
    },
    setAuthorized(authorized) {
      this.authorized = authorized
    },
    setToken(acc_token) {
      this.token = acc_token
    }
  }
})

export default useAuthStore
