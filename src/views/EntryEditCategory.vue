<template>
  <PageHeader title="Category List" icon="shopping_cart" />
  <div id="CategoryList">
    <CategoryList />
  </div>
</template>

<script setup>
import PageHeader from '@/components/PageHeader.vue'
import CategoryList from '@/components/CategoryList.vue'
</script>

<style lang="scss" scoped>
#Header {
  margin: 20px 10px;
  text-align: center;
  font-size: 14px;
  font-style: Bold;
}
#PurchaseList {
  margin: 10px; /* Adds margin on all sides */
}
</style>
