<template>
  <div class="multiselect">
    <div @click="toggleDropdown" class="selected-items">
      <span>Filters</span>
      <RiArrowDownSFill
        class="dropdown-icon"
        :class="{
          'rotate-down': !isDropdownOpen,
          'rotate-up': isDropdownOpen
        }"
      />
    </div>
    <div v-show="isDropdownOpen" class="dropdown">
      <label v-for="(item, index) in items" :key="index" class="checkbox-label">
        <input
          type="checkbox"
          :id="item"
          :value="item"
          v-model="selectedItems"
          @change="handleCheckboxChange"
        />
        {{ item }}
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { RiArrowDownSFill } from '@remixicon/vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps(['items'])
const emit = defineEmits(['dropfilter'])

const isDropdownOpen = ref(false)
const selectedItems = ref([])

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const handleCheckboxChange = () => {
  emit('dropfilter', selectedItems.value)
}
</script>

<style lang="scss" scoped>
.multiselect {
  position: relative;
  font-family: Arial, sans-serif;
  margin: 0rem 1rem;
  width: 20rem;

  .selected-items {
    display: flex;
    align-items: center;
    justify-content: space-between; /* Ensure space between the text and icon */
    padding: 1rem;
    border: 0.1rem solid #ccc;
    cursor: pointer;

    .dropdown-icon {
      margin-left: auto;
      text-align: right;
      width: 3rem;
      height: 3rem;
      color: green;
    }

    .rotate-down {
      transform: rotate(0deg);
      transition: transform 0.3s ease;
    }

    .rotate-up {
      transform: rotate(180deg);
      transition: transform 0.3s ease;
    }
  }

  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    border: 0.1rem solid #ccc;
    padding: 1rem;
    max-height: 15rem;
    overflow-y: auto;
    width: 20rem;
  }

  .checkbox-label {
    display: block;
    margin-bottom: 0.8rem;
  }
}
</style>
