// Login.vue
<template>
  <div id="login" class="login-container">
    <form @submit.prevent="login">
      <h1>Login</h1>
      <div class="form-inputs">
        <label for="username">Username</label>
        <input
          id="username"
          v-model="input.username"
          type="text"
          name="username"
          placeholder="Username"
          autocomplete="username"
        />
      </div>
      <div class="form-inputs">
        <label for="Password">Password</label>
        <div class="password-wrapper">
          <input
            id="password"
            v-model="input.password"
            :type="isPasswordVisible ? 'text' : 'password'"
            name="password"
            placeholder="Enter Password"
            autocomplete="current-password"
          />
          <span
            class="password-icon material-symbols-outlined"
            :class="{ visibility_off: !isPasswordVisible }"
            @click="togglePasswordVisibility"
          >
            {{ isPasswordVisible ? 'visibility' : 'visibility_off' }}
          </span>
        </div>
      </div>
      <div class="remember-me">
        <input id="remember" type="checkbox" name="remember" />
        <label for="remember">Remember me</label>
      </div>
    </form>
    <button type="button" @click="login">Login</button>
    <!-- <p v-if="error" class="error-message">{{ error }}</p> -->
  </div>
</template>

<script>
import { ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { cryptoService } from '@/service/security'
import useNotification from '@/service/notificationService'

export default {
  name: 'LogiN',
  emits: ['vnode-unmounted'],

  setup(_, { emit, vnode }) {
    const input = ref({
      username: '',
      password: ''
    })
    const isPasswordVisible = ref(false)
    const router = useRouter()
    const authStore = useAuthStore()
    const { notify } = useNotification()

    const togglePasswordVisibility = () => {
      isPasswordVisible.value = !isPasswordVisible.value
    }

    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('http://localhost:8000/sanctum/csrf-cookie', {
          method: 'GET',
          credentials: 'include' // Ensure cookies are sent
        })
        if (!response.ok) {
          notify('Failed to fetch CSRF token.', 'error')
          throw new Error('Failed to fetch CSRF token')
        }
      } catch (error) {
        notify("Couldn't communite with server.", 'error')
        throw new Error('Failed to fetch CSRF token')
      }
    }

    const login = async () => {
      try {
        // Fetch CSRF token first
        await fetchCsrfToken()

        const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: input.value.username,
            password: input.value.password
          }),
          credentials: 'include' // Include credentials (cookies)
        })

        if (!response.ok) {
          notify('Authentication failed. Please check your credentials.', 'error')
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const responseData = await response.json()

        if (response.status >= 200 && response.status < 300) {
          if (responseData.token) {
            authStore.setToken(responseData.token)
          }
          authStore.setTokenreftime(new Date().setMinutes(new Date().getMinutes() + 10)) //10 min
          const authindex = {
            user: input.value.username,
            authorized: true,
            token: authStore.token,
            tokenreftime: authStore.tokenreftime
          }
          cryptoService.saveData(authindex, 'userindex')
          router.replace({ name: 'dashboard' })
        } else {
          console.error('Authentication failed. Status code:', response.status)
        }
      } catch (error) {
        console.error('An error occurred during authentication:', error)
        notify(error, 'error')
      }
    }

    onBeforeUnmount(() => {
      if (vnode) {
        emit('vnode-unmounted')
      }
    })

    return {
      input,
      isPasswordVisible,
      authStore,
      togglePasswordVisibility,
      login
    }
  }
}
</script>

<style lang="scss" scoped>
#login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }

  .form-inputs {
    margin-bottom: 15px;

    label {
      display: block;
      font-size: 14px;
      margin-bottom: 5px;
      color: #555;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;

      &:focus {
        outline: none;
        border-color: #007bff;
      }
    }
  }

  .password-wrapper {
    position: relative;

    .password-icon {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      cursor: pointer;
      font-size: 18px; // Adjust the font size as needed
    }
  }

  .remember-me {
    margin-top: 10px; /* Adjust spacing as needed */

    label {
      font-size: 14px;
      color: #555;
      margin-left: 5px;
    }
  }

  button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    width: 150px; /* Adjust as needed */

    &:hover {
      background-color: #0056b3;
    }
  }

  .error-message {
    color: red;
    margin-top: 10px;
  }
}
</style>
