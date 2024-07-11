<template>
  <!-- PageHeader component with Font Awesome icon -->
  <PageHeader title="Category List" :icon="['fas', 'cart-shopping']" />
  <div id="CategoryList">
    <CategoryList />
  </div>
</template>

<script setup>
import PageHeader from '@/components/PageHeader.vue'
import CategoryList from '@/components/CategoryList.vue'
</script>

<style lang="scss" scoped>
#CategoryList {
  margin: 1rem; /* Adds margin on all sides */
}
</style>
