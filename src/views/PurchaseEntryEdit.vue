<template>
  <PageHeader title="Purchase List" :icon="icon" />
  <div id="PurchaseList">
    <PurchaseList />
  </div>
</template>

<script setup>
import PageHeader from '@/components/PageHeader.vue'
import PurchaseList from '@/components/PurchaseList.vue'
import { RiShoppingCart2Fill } from '@remixicon/vue'
import { markRaw } from 'vue'

// Mark the icon component as raw to avoid making it reactive
const icon = markRaw(RiShoppingCart2Fill)
</script>

<style lang="scss" scoped>
#Header {
  margin: 2rem 1rem;
  text-align: center;
  font-size: 1.4rem;
  font-style: bold;
}

#PurchaseList {
  margin: 1rem; /* Adds margin on all sides */
}
</style>
