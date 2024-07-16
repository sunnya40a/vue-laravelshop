<template>
  <!-- PageHeader component with Font Awesome icon -->
  <PageHeader title="Category List" :icon="icon" />
  <div id="CategoryList">
    <CategoryList />
  </div>
</template>

<script setup>
import PageHeader from '@/components/PageHeader.vue'
import CategoryList from '@/components/CategoryList.vue'
import { RiSwap3Fill } from '@remixicon/vue'
import { markRaw } from 'vue'

// Mark the icon component as raw to avoid making it reactive
const icon = markRaw(RiSwap3Fill)
</script>

<style lang="scss" scoped>
#CategoryList {
  margin: 1rem; /* Adds margin on all sides */
}
</style>
