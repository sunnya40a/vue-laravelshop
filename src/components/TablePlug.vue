//Table component.
<template>
  <div class="tablearea">
    <h1>Purchase List</h1>
    <div class="bar">
      <SearchComp @search="handleSearch" />
      <div class="spacer"></div>
      <DateRange @date-range-selected="Daterange" />
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
          <th @click="sortBy('material_desc')" class="sortable">
            Description<span v-if="sortByField === 'material_desc'">
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
          <th @click="sortBy('p_price')" class="sortable">
            Price<span v-if="sortByField === 'p_price'">
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
        <!-- <tr v-for="item in sortedData" :key="item.PO"> -->
        <!-- I don't need to sorting function in this component so i disable sorting function below too. -->
        <tr v-for="item in filteredData" :key="item.PO">
          <td>{{ item.PO }}</td>
          <td>{{ item.Pdate }}</td>
          <td>{{ item.item_list }}</td>
          <td>{{ item.material_desc }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ formatCurrency(item.p_price) }}</td>
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
import { ref, computed, onMounted } from 'vue'
import { formatCurrency } from '@/service/helper'
import Pagination from '@/components/PaginatioN.vue'
import SearchComp from '@/components/SearchComp.vue'
import DateRange from '@/components/DateRange.vue'
import { parseISO, format } from 'date-fns'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
import.meta.env.VITE_API_URL
const siteurl = import.meta.env.VITE_API_URL
// Reactive variables
const data = ref(null)
const currentPage = ref(1)
const searchTerm = ref('')
const totalPageCount = ref(1)
const limit = ref(5)
const totalRecords = ref(0)
const sortByField = ref('PO') // Default sorting field
const sortDirection = ref('asc') // Default sorting direction
const searchQuery = ref('') // Initialize search query
const fromDate = ref('')
const toDate = ref('')
const authstore = useAuthStore()
// Computed properties
const filteredData = computed(() => {
  if (!data.value) return null

  // If no search query, return all data
  if (!searchQuery.value) return data.value

  // Filter entire dataset based on search query
  return data.value.filter((item) => {
    // Filter logic: you can customize this based on your requirements
    return Object.values(item).some((val) => {
      return String(val).toLowerCase().includes(searchQuery.value.toLowerCase())
    })
  })
})

// Methods
const fetchData = async () => {
  try {
    const response = await axios.get(`${siteurl}/api/purchase/list`, {
      params: {
        page: currentPage.value,
        limit: limit.value,
        search: searchTerm.value,
        datef: fromDate.value,
        datee: toDate.value,
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

    if (responseData.data !== null) {
      // Format Pdate to dd-MMM-yy format for each item
      responseData.data.forEach((item) => {
        item.Pdate = format(parseISO(item.Pdate), 'dd-MMM-yy')
      })

      data.value = responseData.data
    } else {
      data.value = []
    }

    totalRecords.value = responseData.TotalRecords
    totalPageCount.value = Math.ceil(responseData.TotalRecords / limit.value)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const Daterange = ({ startDate, endDate }) => {
  // Ensure startDate and endDate are valid date strings
  if (startDate && endDate) {
    const isValidDate = (date) => date instanceof Date && !isNaN(date)

    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      console.error('Invalid date format')
      return
    }

    // Format dates to YYYY-MM-DD format
    const formattedStartDate = format(startDate, 'yyyy-MM-dd')
    const formattedEndDate = format(endDate, 'yyyy-MM-dd')

    //console.log('From ->' + formattedStartDate + '-- To->' + formattedEndDate)

    fromDate.value = formattedStartDate
    toDate.value = formattedEndDate
  } else {
    fromDate.value = ''
    toDate.value = ''
  }
  // Fetch data using the updated date range
  currentPage.value = 1
  fetchData()
}

const handlePageChange = (pageNumber) => {
  currentPage.value = pageNumber
  fetchData()
}

const handleSearch = (search) => {
  searchTerm.value = search
  currentPage.value = 1
  fetchData()
}

const handlePerPageChange = (perPage) => {
  limit.value = perPage
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
</script>

<style lang="scss" scoped>
.tablearea {
  margin-left: 50px;
  margin-right: 20px;

  .bar {
    display: flex;
    justify-content: space-between; /* Distribute space between items */
    align-items: center;
    margin: 10px 0;
    .spacer {
      margin-left: 10px; /* Adjust spacing as needed */
    }
  }
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
}
</style>
