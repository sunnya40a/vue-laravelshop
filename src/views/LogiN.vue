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
          <span class="password-icon" @click="togglePasswordVisibility">
            <font-awesome-icon :icon="eyeIcon" />
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

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { cryptoService } from '@/service/security'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import useNotification from '@/service/notificationService'
import axios from 'axios'

const input = ref({
  username: '',
  password: ''
})
const isPasswordVisible = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const { notify } = useNotification()
const siteurl = import.meta.env.VITE_API_URL

// Define computed property for the eye icon
//const eyeIcon = computed(() => (isPasswordVisible.value ? faEye : faEyeSlash))
const eyeIcon = computed(() => (isPasswordVisible.value ? faEyeSlash : faEye))

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const fetchCsrfToken = async () => {
  try {
    const response = await axios.get(`${siteurl}/sanctum/csrf-cookie`, {
      withCredentials: true // Ensure cookies are sent
    })
    if (response.status !== 204) {
      notify('Failed to fetch CSRF token.', 'error')
      throw new Error('Failed to fetch CSRF token')
    }
  } catch (error) {
    notify("Couldn't communicate with server.", 'error')
    throw new Error('Failed to fetch CSRF token')
  }
}
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const login = async () => {
  try {
    // Fetch CSRF token first
    await fetchCsrfToken()
    const response = await axios.post(
      // Changed from axios.get to axios.post for login
      `${siteurl}/api/login`,
      {
        name: input.value.username,
        password: input.value.password
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-CSRF-TOKEN': csrfToken // Include the CSRF token
        },
        withCredentials: true // Include credentials (cookies)
      }
    )

    const responseData = response.data

    if (response.status >= 200 && response.status < 300) {
      if (responseData.token) {
        authStore.setToken(responseData.token)
      }
      authStore.setTokenreftime(new Date().setMinutes(new Date().getMinutes() + 10)) // 10 min
      const authindex = {
        user: input.value.username,
        authorized: true,
        token: authStore.token,
        tokenreftime: authStore.tokenreftime
      }
      cryptoService.saveData(authindex, 'userindex')
      router.replace({ name: 'dashboard' })
      notify('Welcome ' + input.value.username, 'login')
    } else {
      notify('Authentication failed. Please check your credentials.', 'error')
      console.error('Authentication failed. Status code:', response.status)
    }
  } catch (error) {
    if (error.response) {
      // Check for the status code in the error response
      if (error.response.status === 401) {
        notify('Unauthorized. Please check your username and password.', 'error')
      } else {
        notify('An error occurred during authentication.', 'error')
      }
      console.error('Error response status:', error.response.status)
      console.error('Error response data:', error.response.data)
    } else {
      notify('An error occurred during authentication.', 'error')
      console.error('An error occurred during authentication:', error)
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
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.4rem;
    margin-bottom: 2rem;
    color: #333;
  }

  .form-inputs {
    margin-bottom: 1.5rem;

    label {
      display: block;
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
      color: #555;
    }

    input {
      width: 100%;
      padding: 1rem;
      border: 0.1rem solid #ccc;
      border-radius: 0.4rem;
      font-size: 1.4rem;

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
      right: 1rem;
      transform: translateY(-50%);
      cursor: pointer;
      font-size: 1.8rem; // Adjust the font size as needed
    }
  }

  .remember-me {
    margin-top: 1rem; /* Adjust spacing as needed */

    label {
      font-size: 1.4rem;
      color: #555;
      margin-left: 0.5rem;
    }
  }

  button {
    padding: 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 0.4rem;
    cursor: pointer;
    font-size: 1.6rem;
    width: 15rem; /* Adjust as needed */

    &:hover {
      background-color: #0056b3;
    }
  }

  .error-message {
    color: red;
    margin-top: 1rem;
  }
}
</style>
