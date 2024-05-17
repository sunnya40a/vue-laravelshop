<template>
  <div class="purchase-entry-form">
    <h2>Data Entry Form</h2>
    <form @submit.prevent="savePurchase">
      <div class="form-group">
        <label for="po">PO:</label>
        <input id="po" v-model="purchase.PO" type="number" required />
      </div>
      <div class="form-group">
        <label for="Pdate">Date:</label>
        <input id="Pdate" v-model="purchase.Pdate" type="date" required />
      </div>
      <div class="form-group">
        <label for="itemList">Item List:</label>
        <div class="autocomplete">
          <input
            id="itemList"
            v-model="searchText"
            type="text"
            @input="handleSearch"
            @focus="showItemList = true"
            @blur="handleBlur"
            placeholder="Search or select an item"
            required
          />
          <ul v-if="showItemList" class="item-list">
            <li v-for="item in filteredItems" :key="item.item_list" @click="selectItem(item)">
              [ {{ item.item_list }} ] {{ item.description }}
            </li>
          </ul>
        </div>
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="purchase.description" readonly required></textarea>
      </div>
      <div class="form-group">
        <label for="qty">Qty:</label>
        <input id="qty" v-model="purchase.qty" type="number" required />
      </div>
      <div class="form-group">
        <label for="unit">Unit:</label>
        <input id="unit" v-model="purchase.unit" type="text" readonly required />
      </div>
      <div class="form-group">
        <label for="category">Category:</label>
        <input id="category" v-model="purchase.category" type="text" readonly required />
      </div>
      <div class="form-group">
        <label for="price">Price:</label>
        <input id="price" v-model="purchase.price" type="number" required />
      </div>
      <button type="submit">Save</button>
    </form>
    <p v-if="feedbackMessage">{{ feedbackMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCategoriesStore } from '@/stores/categories'
import { useAuthStore } from '@/stores/auth'

const categoriesStore = useCategoriesStore()
const authStore = useAuthStore()
const { categories, fetchCategories } = categoriesStore

const items = ref([])
const searchText = ref('')
const showItemList = ref(false)

const fetchItems = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/inventory/itemlist', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.token}`
      },
      credentials: 'include'
    })
    if (!response.ok) {
      throw new Error('Failed to fetch items')
    }
    const data = await response.json()
    items.value = data.data // Ensure you're accessing the 'data' array correctly
  } catch (error) {
    console.error('Error fetching items:', error)
  }
}

onMounted(() => {
  if (categories.length === 0) {
    fetchCategories()
  }

  fetchItems()
  // Set today's date for Pdate
  const today = new Date().toISOString().substr(0, 10) // YYYY-MM-DD format
  purchase.value.Pdate = today
})

const purchase = ref({
  PO: 0,
  Pdate: '',
  vendor: '',
  item_list: '',
  description: '',
  qty: 0,
  unit: '',
  category: '',
  price: 0
})

const feedbackMessage = ref('')

const handleSearch = () => {
  showItemList.value = true
}

const handleBlur = () => {
  // Delay hiding the list so that click events on list items are detected
  setTimeout(() => {
    showItemList.value = false
  }, 200)
}

const selectItem = (item) => {
  purchase.value.item_list = item.item_list
  purchase.value.description = item.description
  purchase.value.category = item.category
  purchase.value.unit = item.unit
  searchText.value = `${item.item_list} - ${item.description}` // Update search text
  showItemList.value = false
}

const filteredItems = computed(() => {
  const search = searchText.value.toLowerCase()
  return items.value.filter(
    (item) =>
      item.item_list.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search)
  )
})
</script>

<style scoped lang="scss">
.purchase-entry-form {
  align-items: center;
  max-width: 500px;
  margin: auto;
  padding: 10px;
  background-color: #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

form {
  display: grid;
  gap: 5px;

  .form-group {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 5px;

    label {
      min-width: 80px; /* Adjust as needed for label width */
      text-align: right; /* Align labels to the right for consistency */
      margin-right: 5px; /* Space between label and input */
      color: #1d1c1c;
      font-size: 10px;
      font-weight: bold;
    }

    input,
    textarea {
      flex: 1; /* Take remaining space */
      padding: 5px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 4px;
      background-color: rgb(245, 244, 226);
      transition:
        border-color 0.3s ease,
        background-color 0.3s ease;
    }

    input[type='number'],
    textarea {
      resize: vertical;
    }

    input:focus,
    textarea:focus {
      outline: none;
      border-color: #007bff;
      background-color: #d3f9d8; /* Light green background on focus */
    }

    .autocomplete {
      position: relative;

      input {
        width: 100%;
        padding: 10px;
        font-size: 14px;
        //font-weight: bold;
        border: 1px solid #ccc;
        border-radius: 4px;
        transition:
          border-color 0.3s ease,
          background-color 0.3s ease;
      }

      input:focus {
        outline: none;
        border-color: #007bff;
        background-color: #d3f9d8; /* Light green background on focus */
      }

      .item-list {
        position: absolute;
        background-color: #ddd;
        border: 1px solid #ccc;
        z-index: 1;
        width: 100%;
        max-height: 150px;
        overflow-y: auto;
        list-style-type: none;
        padding: 0;
        margin: 0;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        border-radius: 4px;
      }

      .item-list li {
        padding: 10px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }

      .item-list li:hover {
        background-color: #007bff;
        color: #fff;
      }
    }
  }

  button[type='submit'] {
    background-color: #007bff;
    color: #fff;
    padding: 12px 20px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    justify-self: center;
  }

  button[type='submit']:hover {
    background-color: #0056b3;
  }

  p {
    text-align: center;
    color: green;
    font-weight: bold;
    margin-top: 10px;
  }
}
</style>
