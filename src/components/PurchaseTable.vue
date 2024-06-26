<!-- Components/PurchaseTable.vue -->
<template>
  <div>
    <h1>Purchase List</h1>
    <div class="bar">
      <SearchComp @search="handleSearch" />
      <FilterRadios @timefilter="handleTimefilter" />
      <FilterDropdown :items="uniqueUsers" @dropfilter="handleDropdown" />
    </div>
    <table class="Table">
      <thead>
        <tr>
          <th>PO</th>
          <th>Date</th>
          <th>Item List</th>
          <th>Description</th>
          <th>Category</th>
          <th>Qty</th>
          <th>Price</th>
          <th>User</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredItems" :key="item.PO">
          <td>{{ item.PO }}</td>
          <td>{{ item.Pdate }}</td>
          <td>{{ item.item_list }}</td>
          <td>{{ item.material_desc }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.user }}</td>
          <td><a href="#">Details</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import SearchComp from '@/components/SearchComp.vue'
import FilterRadios from '@/components/FilterRadios.vue'
import FilterDropdown from './FilterDropdown.vue'
import { ref, computed, watch } from 'vue'
import { parse } from 'date-fns'

// Define props outside the setup function
const props = defineProps(['items', 'timefilter', 'dropfilter'])

const filterterm = ref('')
const searchTerm = ref('')
const selectedItems = ref([])

const handleSearch = (search) => {
  searchTerm.value = search
}

const handleTimefilter = (timefilter) => {
  filterterm.value = timefilter
}

const handleDropdown = (items) => {
  selectedItems.value = items
}

const uniqueUsers = computed(() => {
  const items = props.items

  const itemsWithUser = items.filter((item) => item.user !== undefined && item.user !== null)

  return Array.from(new Set(itemsWithUser.map((item) => item.user)))
})

const filteredItems = computed(() => {
  const currentDate = new Date()
  const filteredByTime = props.items.filter((item) => {
    const itemDate = parse(item.Pdate, 'dd/MM/yyyy', new Date())

    if (!(itemDate instanceof Date) || isNaN(itemDate)) {
      console.error(`Invalid date format for item with Pdate: ${item.Pdate}`)
      return false
    }

    switch (filterterm.value) {
      case 'lastYear':
        return itemDate.getFullYear() === currentDate.getFullYear() - 1
      case 'thisYear':
        return itemDate.getFullYear() === currentDate.getFullYear()
      case 'lastMonth':
        return (
          itemDate.getMonth() === currentDate.getMonth() - 1 &&
          itemDate.getFullYear() === currentDate.getFullYear()
        )
      case 'thisMonth':
        return (
          itemDate.getMonth() === currentDate.getMonth() &&
          itemDate.getFullYear() === currentDate.getFullYear()
        )
      case 'lastWeek': {
        const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000)
        return itemDate >= oneWeekAgo && itemDate <= currentDate
      }
      case 'thisWeek': {
        const startOfWeek = currentDate.getDate() - currentDate.getDay()
        const endOfWeek = startOfWeek + 6
        const startDate = new Date(currentDate.setDate(startOfWeek))
        const endDate = new Date(currentDate.setDate(endOfWeek))
        return itemDate >= startDate && itemDate <= endDate
      }
      case 'today':
        return itemDate.toDateString() === currentDate.toDateString()
      default:
        return true
    }
  })

  const searchTermLower = searchTerm.value.toLowerCase()

  const filteredBySearch = filteredByTime.filter((item) => {
    return (
      String(item.PO).includes(searchTermLower) ||
      item.qty.toString().includes(searchTermLower) ||
      item.price.toString().includes(searchTermLower) ||
      item.Pdate.toLowerCase().includes(searchTermLower) ||
      item.item_list.toLowerCase().includes(searchTermLower) ||
      item.material_desc.toLowerCase().includes(searchTermLower) ||
      item.category.toLowerCase().includes(searchTermLower) ||
      item.user.toLowerCase().includes(searchTermLower)
    )
  })

  // Apply additional filtering based on selectedItems
  if (selectedItems.value.length > 0) {
    return filteredBySearch.filter((item) => {
      return selectedItems.value.includes(item.user)
    })
  } else {
    // If selectedItems is empty, show all records
    return filteredBySearch
  }
})

// Watch for changes in props.items
watch(
  () => props.items,
  () => {
    // Handle any necessary logic when props.items changes
    // For example, you may want to recalculate uniqueUsers or filteredItems
  }
)
</script>

<style lang="scss" scoped>
.bar {
  display: flex;
  justify-content: space-between; /* Distribute space between items */
  align-items: center;
  margin: 10px 0;
}

.Table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    padding: 15px; /* Increase padding for better spacing */
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  thead {
    background-color: #4caf50; /* Green header color */
    color: white;
  }

  tbody tr:hover {
    background-color: #f2f2f2; /* Light gray background on hover */
  }

  a {
    color: #2196f3; /* Blue link color */
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline; /* Underline link on hover */
  }
}
</style>
