<template>
  <form id="searchForm">
    <div class="search-container">
      <input
        type="text"
        @input="handleInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
        id="searchInput"
        name="searchInput"
        v-model="searchText"
        placeholder="Search..."
        :class="{ focused: isFocused }"
      />
      <RiSearch2Line class="web-icons" />
    </div>
  </form>
</template>

<script setup>
import { defineEmits, ref } from 'vue'
import { RiSearch2Line } from '@remixicon/vue'

const emit = defineEmits(['search'])
const searchText = ref('')
let previousSearchText = '' // Variable to store previous search text
let isFocused = ref(false) // Track focus state
let debounceTimer = null // Debounce timer variable

const handleInput = (e) => {
  // Retrieve the input value
  let inputValue = e.target.value
  // Remove any characters that don't match the desired pattern
  // Remove unwanted characters and replace multiple spaces with single space
  inputValue = inputValue
    .replace(/[^\s\w\-()!,.@[\]]/g, '') // Remove unwanted characters, including '@'
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space

  // Clear previous debounce timer
  clearTimeout(debounceTimer)

  // Set new debounce timer
  debounceTimer = setTimeout(() => {
    // Update the searchText with the filtered input value
    searchText.value = inputValue
    // Emit the searchText only if it has changed after filtering
    if (searchText.value !== previousSearchText) {
      emit('search', searchText.value)
      previousSearchText = searchText.value // Update previousSearchText
    }
  }, 600) // Adjust debounce time as needed (e.g., 300ms)
}
</script>

<style scoped>
#searchForm {
  display: flex;
  justify-content: space-between;
  max-width: 20rem; /* Adjust max-width as needed */
}

.search-container {
  position: relative;
  max-width: 100%; /* Adjust max-width as needed */
}

#searchInput {
  width: calc(100% - 0rem); /* Adjust input width to accommodate icon button */
  outline: none;
  height: 3rem; /* Set desired height */
  padding: 0 1rem; /* Add padding for better look */
  font-size: 1.2rem; /* Increase font size for better readability */
  border: 0.1rem solid #ccc; /* Add border */
  border-radius: 1rem; /* Add border radius */
  transition: border-color 0.3s; /* Smooth transition for border color change */
}

#searchInput.focused {
  border-color: #007bff; /* Blue color when input is focused */
}

.web-icons {
  position: absolute;
  right: 0.8rem; /* Adjust icon position */
  top: 50%; /* Align icon vertically */
  transform: translateY(-50%);
  width: 2rem;
  height: 2rem;
  color: #007bff; /* Adjust icon color */
  /*cursor: pointer;*/
}
</style>
