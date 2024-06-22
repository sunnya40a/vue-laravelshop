<!-- PurchaseEntryForm.vue -->
<template>
  <div class="purchase-entry-form">
    <h2>Data Entry Form</h2>
    <form @submit.prevent="savePurchase">
      <div class="form-group">
        <label for="po">PO:</label>
        <input id="po" v-model="purchase.PO" type="number" required />
      </div>
      <div class="form-group">
        <label for="itemList">Item List:</label>
        <input id="itemList" v-model="purchase.item_list" type="text" required />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="purchase.description" required></textarea>
      </div>
      <div class="form-group">
        <label for="qty">Qty:</label>
        <input id="qty" v-model="purchase.qty" type="number" required />
      </div>
      <div class="form-group">
        <label for="category">Category:</label>
        <select id="category" v-model="purchase.category" required>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="price">Price:</label>
        <input id="price" v-model="purchase.price" type="number" required />
      </div>
      <div class="form-group">
        <label for="user">User:</label>
        <input id="user" v-model="purchase.User" type="text" required />
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCategoriesStore } from '@/stores/categories'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const siteurl = import.meta.env.VITE_API_URL
const categoriesStore = useCategoriesStore()
const { categories, fetchCategories } = categoriesStore
const authstore = useAuthStore()

onMounted(() => {
  if (categories.length === 0) {
    fetchCategories()
  }
})

const purchase = ref({
  PO: 10004,
  item_list: 'DPD - 008',
  description: 'Testing',
  qty: 50,
  category: 'Bakery',
  price: 584,
  User: 'Chalise'
})
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const savePurchase = async () => {
  const url = `${siteurl}/api/purchaseapi`
  try {
    const response = await axios.post(url, purchase.value, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: authstore.token, // Use the stored token
        'X-CSRF-TOKEN': csrfToken // Include the CSRF token
      }
    })
    console.log('Data saved successfully:', response.data)
  } catch (error) {
    console.error('Error saving data:', error)
  }
}
</script>

<style scoped lang="scss">
.purchase-entry-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  h2 {
    text-align: center;
  }

  form {
    display: grid;
    grid-gap: 15px;

    .form-group {
      label {
        display: block;
        margin-bottom: 5px;
      }

      input,
      textarea {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
      }

      button {
        background-color: #007bff;
        color: #fff;
        padding: 10px;
        border: none;
        cursor: pointer;
      }
    }
  }
}
</style>
<style lang="scss" scoped></style>
