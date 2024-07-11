<template>
  <div class="modal">
    <div class="header">
      <span class="close" @click="closeModal">&times;</span>
      <h2 class="heading">
        Category {{ mode === 'edit' ? 'Edit' : mode === 'view' ? 'View' : 'Entry' }} Form
      </h2>
      <div class="modal-content">
        <form @submit.prevent="submitForm" v-if="mode !== 'view'">
          <div class="form-group">
            <label for="category_code">Category Code:</label>
            <input
              id="category_code"
              v-model="form.category_code"
              @input="filterAlpha"
              type="text"
              required
              :readonly="mode === 'edit'"
            />
          </div>
          <div class="form-group">
            <label for="description">Category:</label>
            <input id="description" v-model="form.description" type="text" required />
          </div>
          <div class="button-group">
            <button type="submit" class="btn btn-primary">
              <font-awesome-icon icon="floppy-disk" class="fa-icons" />
              {{ category ? 'Update' : 'Save' }}
            </button>
            <button type="button" class="btn btn-secondary" @click="closeModal">
              <font-awesome-icon icon="circle-xmark" class="fa-icons" />
              Cancel
            </button>
          </div>
        </form>
        <!-- below code is for view only -->
        <div v-else>
          <div class="form-group">
            <label for="category_code">Category Code:</label>
            <input id="category_code" v-model="form.category_code" type="text" readonly />
          </div>

          <div class="form-group">
            <label for="description">Category:</label>
            <input id="description" v-model="form.description" type="text" readonly />
          </div>
          <div class="button-group">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              <font-awesome-icon icon="circle-xmark" class="fa-icons" />
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { defineProps, defineEmits, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import useNotification from '@/service/notificationService'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps({
  category: {
    type: Object,
    default: null
  },
  mode: {
    type: String,
    default: 'entry' // 'entry', 'edit', or 'view'
  }
})

const siteurl = import.meta.env.VITE_API_URL
const { notify } = useNotification()

const authStore = useAuthStore()
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

const form = ref({
  category_code: props.category ? props.category.category_code : '',
  description: props.category ? props.category.description : ''
})

const filterAlpha = () => {
  form.value.category_code = form.value.category_code.replace(/[^a-zA-Z]/g, '').toUpperCase()
}

const emit = defineEmits(['close', 'refresh'])

const closeModal = () => {
  emit('close')
}

const submitForm = async () => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: authStore.token,
      'X-CSRF-TOKEN': csrfToken
    }

    let response

    if (props.category) {
      response = await axios.put(
        `${siteurl}/api/categories/update?code=${props.category.category_code}`,
        form.value,
        {
          headers
        }
      )
    } else {
      response = await axios.post(`${siteurl}/api/categories/save`, form.value, { headers })
    }

    if (response.status >= 200 && response.status < 300) {
      notify(response.data.message || 'Category saved successfully', 'success')
      emit('refresh')
      emit('close')
    } else {
      notify(response.data.message || 'Failed to save category', 'error')
    }
  } catch (error) {
    notify(error.response?.data?.message || 'An error occurred while saving category', 'error')
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.header {
  font-size: 15px;
  margin: 10px;
  position: relative;
  background: #007bff;
  padding: 15px 0;
  border-radius: 8px;
  width: 600px;
  max-width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  .heading {
    color: white;
    margin-left: 15px;
  }
}

.modal-content {
  margin-top: 10px;
  background: white;
  padding: 15px;
  font-size: 12px;
}

.close {
  position: absolute;
  color: white;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

.form-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;

  label {
    width: 100px;
    font-weight: bold;
  }

  input,
  textarea {
    flex: 1;
    padding: 5px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: rgb(245, 244, 226);
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: #007bff;
    background-color: #d3f9d8; /* Light green background on focus */
  }

  textarea {
    resize: vertical;
    height: 50px;
  }
}

.autocomplete {
  position: relative;

  .item-list,
  .supplier_list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 200px;
    overflow-y: auto;
    background: #f0f0f0;
    border: 1px solid blue;
    border-top: none;
    z-index: 1000;

    li {
      padding: 10px;
      cursor: pointer;

      &:hover {
        background: #d4d4d4;
      }
    }
  }
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  .btn {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btn-primary {
    background-color: #007bff;
    color: white;

    &:hover {
      background-color: #0056b3;
    }
  }

  .btn-secondary {
    background-color: #6c757d;
    color: white;

    &:hover {
      background-color: #5a6268;
    }
  }
  .fa-icons {
    font-size: 20px;
  }
}
</style>
