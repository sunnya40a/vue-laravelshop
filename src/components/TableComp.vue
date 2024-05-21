<template>
  <div>
    <div class="searcharea">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search..."
        @input="handleSearchChange"
      />
    </div>

    <table class="Table">
      <thead>
        <tr>
          <th @click="sortBy('PO')" class="sortable">
            PO
            <span v-if="sortByField === 'PO'">
              <span class="material-symbols-outlined">{{
                sortDirection === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down'
              }}</span>
            </span>
          </th>
          <th @click="sortBy('Pdate')" class="sortable">
            Date
            <span v-if="sortByField === 'Pdate'">
              <span class="material-symbols-outlined">{{
                sortDirection === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down'
              }}</span>
            </span>
          </th>
          <th @click="sortBy('item_list')" class="sortable">
            Item List<span v-if="sortByField === 'item_list'">
              <span class="material-symbols-outlined">{{
                sortDirection === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down'
              }}</span>
            </span>
          </th>
          <th @click="sortBy('description')" class="sortable">
            Description<span v-if="sortByField === 'description'">
              <span class="material-symbols-outlined">{{
                sortDirection === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down'
              }}</span>
            </span>
          </th>
          <th @click="sortBy('category')" class="sortable">
            Category<span v-if="sortByField === 'category'">
              <span class="material-symbols-outlined">{{
                sortDirection === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down'
              }}</span>
            </span>
          </th>
          <th @click="sortBy('qty')" class="sortable">
            Qty<span v-if="sortByField === 'qty'">
              <span class="material-symbols-outlined">{{
                sortDirection === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down'
              }}</span>
            </span>
          </th>
          <th @click="sortBy('price')" class="sortable">
            Price<span v-if="sortByField === 'price'">
              <span class="material-symbols-outlined">{{
                sortDirection === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down'
              }}</span>
            </span>
          </th>
          <th @click="sortBy('user')" class="sortable">
            User<span v-if="sortByField === 'user'">
              <span class="material-symbols-outlined">{{
                sortDirection === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down'
              }}</span>
            </span>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sortedData" :key="item.PO">
          <td>{{ item.PO }}</td>
          <td>{{ item.Pdate }}</td>
          <td>{{ item.item_list }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.user }}</td>
          <td><a href="#">Details</a></td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :current-page="currentPage"
      :total-page-count="totalPageCount"
      :per-page="limit"
      :totalRecords="totalRecords"
      @page-change="handlePageChange"
      @per-page-change="handlePerPageChange"
    />
  </div>
</template>

<script setup>
import Pagination from '@/components/PaginatioN.vue'
import { useAuthStore } from '@/stores/auth'
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'

const siteurl = import.meta.env.VITE_API_URL

const currentPage = ref(1)
const limit = ref(20)
const searchQuery = ref('')
const sortByField = ref('PO')
const sortDirection = ref('asc')
const authstore = useAuthStore()

let data = ref(null)
let totalRecords = ref(0)
let totalPageCount = ref(1)

const fetchData = async () => {
  try {
    const response = await axios.get(`${siteurl}/api/purchase/list`, {
      params: {
        page: currentPage.value,
        limit: limit.value,
        search: searchQuery.value,
        sortBy: sortByField.value,
        sortOrder: sortDirection.value
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: authstore.token // Use the stored token
      },
      withCredentials: true // Include credentials (cookies)
    })

    const responseData = response.data
    data.value = responseData.data
    totalRecords.value = responseData.TotalRecords
    totalPageCount.value = Math.ceil(responseData.TotalRecords / limit.value)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const handlePageChange = (pageNumber) => {
  currentPage.value = pageNumber
  fetchData()
}

const handlePerPageChange = (perPage) => {
  limit.value = perPage
  currentPage.value = 1
  fetchData()
}

const handleSearchChange = () => {
  currentPage.value = 1
  fetchData()
}

const sortBy = (field) => {
  sortByField.value = field
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  fetchData()
}

// Fetch data on component mount
onMounted(fetchData)

// Watch for changes in currentPage, limit, or searchQuery
watch([currentPage, limit, searchQuery], () => {
  fetchData()
})

// Computed property for filteredData
const filteredData = computed(() => {
  if (!data.value) return null

  // If no search query, return all data
  if (!searchQuery.value) return data.value

  // Filter entire dataset based on search query
  return data.value.filter((item) => {
    // Filter logic: customize based on your requirements
    return Object.values(item).some((val) => {
      return String(val).toLowerCase().includes(searchQuery.value.toLowerCase())
    })
  })
})

// Computed property for sortedData
const sortedData = computed(() => {
  if (!filteredData.value) return null
  let sorted = filteredData.value.slice()
  if (sortByField.value) {
    sorted.sort((a, b) => {
      let modifier = sortDirection.value === 'desc' ? -1 : 1
      if (a[sortByField.value] < b[sortByField.value]) return -1 * modifier
      if (a[sortByField.value] > b[sortByField.value]) return 1 * modifier
      return 0
    })
  }
  return sorted
})
</script>

<style lang="scss" scoped>
.searcharea {
  margin-left: 50px;
  font-size: 20px;
  height: 20px;
}
.Table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ccc;
  font-family: Arial, sans-serif;
  font-size: 20px;
  margin-left: 50px;
  .sortable {
    cursor: pointer; /* Change cursor to pointer */
  }

  th,
  td {
    padding: 10px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
    border-bottom: 2px solid #ddd;
  }

  td {
    border-bottom: 1px solid #ddd;
  }

  tr:hover {
    background-color: #f5f5f5;
  }

  a {
    text-decoration: none;
    color: #007bff;
  }
}
</style>
