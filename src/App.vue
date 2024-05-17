<!-- App.vue -->
<script>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { LocalCleanup } from '@/service/helper'
import NavBar from '@/components/NavBar.vue'
import NotiFication from '@/components/NotiFication.vue'

export default {
  components: {
    NavBar,
    NotiFication
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const showNavbar = ref(authStore.isAuthenticated)
    let inactivityTimerId = ref(null)
    let refreshtokenTimerId = ref(null)

    const resetInactivityTimer = () => {
      if (inactivityTimerId.value) {
        clearTimeout(inactivityTimerId.value)
      }
      inactivityTimerId.value = setTimeout(logoutCall, 60000 * 3) // 3 minutes
    }

    const resetRefreshTokenTimer = () => {
      if (refreshtokenTimerId.value) {
        clearTimeout(refreshtokenTimerId.value)
      }
      refreshtokenTimerId.value = setTimeout(refreshtokentimeCheck, 60000 * 10) // 10 minutes
    }

    const logoutCall = () => {
      console.log('logout function called from App.vue')
      if (authStore.isAuthenticated) {
        router.push('/logout')
        LocalCleanup()
        clearTimeout(inactivityTimerId.value)
      } else {
        console.log('User is not logged in!!!')
      }
    }

    const refreshtokentimeCheck = async () => {
      if (authStore.isAuthenticated) {
        const reftime = authStore.tokenreftime
        const currentTime = new Date().getTime()
        if (reftime && reftime - currentTime <= 9.5 * 60 * 1000) {
          console.log('Refreshing token...')
          await refreshcsrfToken()
          authStore.setTokenreftime(new Date().setMinutes(new Date().getMinutes() + 10)) // 10 minutes
        } else {
          console.log('Token refresh check skipped.')
        }
      } else {
        console.log('User is not logged in!!! to renew token')
      }
      resetRefreshTokenTimer()
    }

    const refreshcsrfToken = async () => {
      try {
        const response = await fetch('http://localhost:8000/sanctum/csrf-cookie', {
          method: 'GET',
          credentials: 'include' // Ensure cookies are sent
        })
        if (!response.ok) {
          throw new Error('Failed to fetch CSRF token')
        }
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error)
        throw new Error('Failed to fetch CSRF token')
      }
    }

    onMounted(() => {
      window.addEventListener('mousemove', resetInactivityTimer)
      window.addEventListener('keydown', resetInactivityTimer)
      window.addEventListener('touchstart', resetInactivityTimer)
      resetInactivityTimer()
      resetRefreshTokenTimer()
    })

    onUnmounted(() => {
      window.removeEventListener('mousemove', resetInactivityTimer)
      window.removeEventListener('keydown', resetInactivityTimer)
      window.removeEventListener('touchstart', resetInactivityTimer)
      clearTimeout(inactivityTimerId.value)
      clearTimeout(refreshtokenTimerId.value)
    })

    watch(
      () => authStore.isAuthenticated,
      (newVal) => {
        showNavbar.value = newVal
      }
    )

    return {
      showNavbar
    }
  }
}
</script>

<template>
  <div>
    <div>
      <!-- Display SideBar only if showSide is true -->
      <NavBar v-if="showNavbar" />
    </div>
    <div>
      <NotiFication />
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
:root {
  font-size: 62.5%;
  --sidebar-width: 2rem;
  --expanded-sidebar-width: 320px;
  --menubackground: #1d5d9b;
  --menutext: #e0e0e0;
  --headertext: #00ffff;
  --activebackground: #141e46;
  --menuhovercolor: #073757;
  --activeborder: #ff9843;
  --seperatorcolor: #073757;

  --menuiconcolor: #e0e0e0;
  --dropdownmenucolor: #fcda91;
  --light: #f1f5f9;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira sans', sans-serif;
}

body {
  background: var(--light);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;

  main {
    flex: 1 1 0;
    padding: 2rem;

    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
  }
}
</style>
