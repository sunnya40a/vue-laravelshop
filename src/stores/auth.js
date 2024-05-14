import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Initial state of the store
    username: '',
    authorized: false,
    token: '',
    tokenreftime: new Date()
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
    },
    getTokenreftime(state) {
      return state.tokenreftime
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
    },
    setTokenreftime(time) {
      this.tokenreftime = time
    }
  }
})

export default useAuthStore
