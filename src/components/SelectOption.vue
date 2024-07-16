<template>
  <div class="dropdown">
    <label for="item-select">Choose an item:</label>
    <div id="item-select" @click="toggleDropdown" class="dropdown-selected">
      {{ selectedItemDescription || 'Select an item' }}
      <span class="dropdown-icon">C</span>
      <!-- Dropdown icon -->
    </div>
    <div v-if="dropdownOpen" class="dropdown-options">
      <table>
        <thead>
          <tr>
            <th style="width: 75px">Code</th>
            <th style="width: 125px">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item.code"
            @click="selectItem(item)"
            class="dropdown-option"
          >
            <td>{{ item.code }}</td>
            <td>{{ item.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>Selected Item Code: {{ selectedItemCode }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Sample data
const items = ref([
  { code: 'DPD - 001', description: 'Milk (Whole)' },
  { code: 'DPD - 002', description: 'Milk Cow' },
  { code: 'DPD - 003', description: 'Yogurt (Sweet)' }
])

// Selected item code
const selectedItemCode = ref(null)

// Computed property to find the selected item's description
const selectedItemDescription = computed(() => {
  const selectedItem = items.value.find((item) => item.code === selectedItemCode.value)
  return selectedItem ? selectedItem.description : ''
})

// State for dropdown open/close
const dropdownOpen = ref(false)

// Function to toggle dropdown
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

// Function to select an item
const selectItem = (item) => {
  selectedItemCode.value = item.code
  dropdownOpen.value = false
}
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 300px;
}

.dropdown-selected {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dropdown-selected .dropdown-icon {
  margin-left: 8px; /* Adjust icon position */
}

.dropdown-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid #ccc;
  background-color: white;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  width: 100%;
}

.dropdown-options table {
  width: 100%;
  border-collapse: collapse;
}

.dropdown-options th,
.dropdown-options td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.dropdown-options th {
  background-color: #f0f0f0;
}

.dropdown-option:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}
</style>
