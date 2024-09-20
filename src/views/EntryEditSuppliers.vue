//EntryEditSupplier.vue
<template>
  <PageHeader title="Supplier List" :icon="icon" />
  <div id="SupplierList">
    <ListSupplier />
  </div>
</template>

<script setup>
import PageHeader from '@/components/PageHeader.vue'
import ListSupplier from '@/components/ListSupplier.vue'
import { RiTruckFill } from '@remixicon/vue'
import { markRaw } from 'vue'

// Mark the icon component as raw to avoid making it reactive
const icon = markRaw(RiTruckFill)
</script>

<style lang="scss" scoped>
#SupplierList {
  margin: 1rem; /* Adds margin on all sides */
}
</style>
