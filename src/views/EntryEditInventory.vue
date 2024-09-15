//EntryEditInventory.vue
<template>
  <PageHeader title="Inventory List" :icon="icon" />
  <div id="InventoryList">
    <ListInventory />
  </div>
</template>

<script setup>
import PageHeader from '@/components/PageHeader.vue'
import ListInventory from '@/components/ListInventory.vue'
import { RiStockFill } from '@remixicon/vue'
import { markRaw } from 'vue'

// Mark the icon component as raw to avoid making it reactive
const icon = markRaw(RiStockFill)
</script>

<style lang="scss" scoped>
#InventoryList {
  margin: 1rem; /* Adds margin on all sides */
}
</style>
