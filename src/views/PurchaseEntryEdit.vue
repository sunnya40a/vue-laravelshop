<template>
  <PageHeader title="Purchase List" icon="shopping_cart" />
  <div id="PurchaseList">
    <PurchaseList />
  </div>
</template>

<script setup>
import PageHeader from '@/components/PageHeader.vue'
import PurchaseList from '@/components/PurchaseList.vue'
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
