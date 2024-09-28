//ListInventory.vue
<template>
  <div class="container">
    <div class="bar">
      <div>
        <SearchComp @search="handleSearchText" />
      </div>
      <button class="add-record-btn" @click="showAddForm">
        <RiAddCircleLine class="web-icons" /> Add Item
      </button>
    </div>
    <div class="table-container">
      <table class="inventory-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="inventories.length === 0">
            <td colspan="10">No records found.</td>
          </tr>
          <tr v-for="inventory in inventories" :key="inventory.item_list">
            <td>{{ inventory.item_list }}</td>
            <td>{{ inventory.description }}</td>
            <td>{{ inventory.qty }}</td>
            <td>{{ inventory.unit }}</td>
            <td>{{ inventory.category }}</td>
            <td>{{ inventory.s_name }}</td>
            <td class="action-buttons">
              <button class="action-btn view-btn" @click="viewRecord(inventory)">
                <RiZoomInLine class="web-icons" /> View
              </button>
              <button class="action-btn edit-btn" @click="editRecord(inventory)">
                <RiEditLine size="2rem" class="web-icons" /> Edit
              </button>
              <button
                class="action-btn delete-btn"
                @click="openConfirmationDialogbox(inventory.item_list)"
              >
                <RiDeleteBin7Fill class="web-icons" /> Delete
              </button>
            </td>
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
      <FormInventory
        v-if="isFormVisible"
        :inventory="selectedInventory"
        :mode="formMode"
        @close="closeForm"
        @refresh="fetchPurchases"
      />
    </div>

    <DialogBox
      :title="dialogTitle"
      :message="dialogMessage"
      :id="dialogId"
      :buttons="dialogButtons"
      :visible="dialogVisible"
      @confirm="handleAfterDialogConfirm"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import FormInventory from '@/components/FormInventory.vue'
import SearchComp from '@/components/SearchComp.vue'
import { useAuthStore } from '@/stores/auth'
import useNotification from '@/service/notificationService'
import DialogBox from '@/components/DialogBox.vue'
import useDialog from '@/service/useDialog'
import Pagination from '@/components/PaginatioN.vue'
import { RiAddCircleLine, RiEditLine, RiZoomInLine, RiDeleteBin7Fill } from '@remixicon/vue'

const { dialogTitle, dialogMessage, dialogId, dialogButtons, dialogVisible } = useDialog()

const openConfirmationDialogbox = (item_code) => {
  dialogTitle.value = 'Confirm Action'
  dialogMessage.value = 'Are you sure that you want to delete PO ' + item_code + '?'
  dialogId.value = item_code
  dialogButtons.value = ['Yes', 'No']
  dialogVisible.value = true
}

const { notify } = useNotification()
const inventories = ref([])
const isFormVisible = ref(false)
const selectedInventory = ref(null)
const formMode = ref('entry') // 'entry', 'edit', 'view'
const authStore = useAuthStore()
const siteUrl = import.meta.env.VITE_API_URL
const currentPage = ref(1)
const limit = ref(10)
const searchQuery = ref('')
const sortByField = ref('item_list')
const sortDirection = ref('asc')

let totalRecords = ref(0)
let totalPageCount = ref(1)

const fetchPurchases = async () => {
  try {
    const response = await axios.get(`${siteUrl}/api/inventory/list`, {
      params: {
        page: currentPage.value,
        limit: limit.value,
        search: searchQuery.value,
        sortBy: sortByField.value,
        sortOrder: sortDirection.value
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authStore.token}`
      },
      withCredentials: true
    })
    inventories.value = response.data.data
    totalRecords.value = response.data.TotalRecords
    totalPageCount.value = Math.ceil(response.data.TotalRecords / limit.value)
  } catch (error) {
    console.error('Error fetching inventories:', error)
  }
}

const handlePageChange = (pageNumber) => {
  currentPage.value = pageNumber
  fetchPurchases()
}

const handlePerPageChange = (perPage) => {
  limit.value = perPage
  currentPage.value = 1
  fetchPurchases()
}

const handleSearchText = (searchText) => {
  searchQuery.value = searchText
  fetchPurchases()
}

const showAddForm = () => {
  selectedInventory.value = null
  formMode.value = 'entry'
  isFormVisible.value = true
}

const viewRecord = (inventory) => {
  selectedInventory.value = inventory
  formMode.value = 'view'
  isFormVisible.value = true
}

const editRecord = (inventory) => {
  selectedInventory.value = inventory
  formMode.value = 'edit'
  isFormVisible.value = true
}

const closeForm = () => {
  isFormVisible.value = false
}

const handleAfterDialogConfirm = async (option) => {
  dialogVisible.value = false
  if (option === 'Yes' && dialogId.value) {
    try {
      const response = await axios.delete(
        `${siteUrl}/api/inventory/delete?code=${dialogId.value}`,
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        }
      )

      if (response.status === 200) {
        if (totalRecords.value % limit.value === 1 && currentPage.value >= 2) {
          currentPage.value -= 1
        }
        fetchPurchases()
        notify(response.data.message, 'success')
      } else {
        notify(
          `Failed to delete inventory ${dialogId.value}. Server responded with: ${response.status}`,
          'error'
        )
      }
    } catch (error) {
      if (error.response) {
        // Handle specific status codes
        if (error.response.status >= 400 && error.response.status < 500) {
          // Notify user with the error message
          notify(error.response.data.error, 'error')
        } else if (error.response.status >= 500) {
          // Handle server errors
          notify('Server error occurred. Please try again later.', 'error')
        }
      } else {
        // Handle network errors or no response from server
        notify(
          'Network or server error occurred. Please check your connection and try again.',
          'error'
        )
      }
    }
  }
}

onMounted(fetchPurchases)
</script>

<style scoped lang="scss">
.container {
  margin-top: 0;
  padding-left: 4rem;

  .bar {
    display: flex;
    justify-content: space-between; /* Align items horizontally with space between */
    align-items: center;
    margin: 1rem 0;
    padding: 1rem, 0;
  }

  .searcharea {
    flex: 1; /* Allow search area to grow and fill available space */

    .search-box {
      height: 3rem; /* Set desired height */
      padding: 0 1rem; /* Add padding for better look */
      font-size: 1.6rem; /* Increase font size for better readability */
      border: 0.1rem solid #ccc; /* Add border */
      border-radius: 1rem; /* Add border radius */
    }
    .search-icon {
      position: relative;
      top: 2rem;
      left: -3rem;
      transform: translateY(-40%);
      font-size: 2.5rem;
      color: #aaa; /* Adjust icon color */
      pointer-events: none; /* Ensure icon is not clickable */
    }
  }

  .add-record-btn {
    display: flex;
    align-items: center;
    padding: 1rem 2rem;
    font-size: 1.4rem;
    border: none;
    background-color: var(--active-button-color);
    color: white;
    border-radius: 0.4rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    .web-icons {
      margin-right: 1rem;
      width: 2rem;
      height: 2rem;
    }

    &:hover {
      background-color: var(--hover-button-color);
    }
  }

  .table-container {
    display: flex;
    flex-direction: column;
    height: 80vh;
    width: 100%;
    overflow: auto;

    .inventory-table {
      width: 100%;
      border-collapse: collapse;
      text-align: center;

      th {
        background-color: #e5b2a5;
        padding: 1.5rem 0.2rem;
        font-size: 1.4rem;
        position: sticky;
        top: 0;
        height: 4rem;
        white-space: nowrap;
        border-bottom: 0.2rem solid silver;
      }

      td {
        padding: 0.5rem;
        font-size: 1.4rem;
        height: 4rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-left: 0.1rem solid rgb(243, 71, 3);

        &:first-child {
          border-left: none;
        }
      }

      tbody tr:nth-child(even) {
        background-color: #c9f0c0;
      }

      tbody tr:nth-child(odd) {
        background-color: #b9bac7;
      }

      .action-buttons {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
      }

      .action-btn {
        padding: 1.5rem 0.8rem;
        border: none;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1.4rem;
        display: flex;
        align-items: center;
        transition: background-color 0.3s ease;

        &:hover {
          opacity: 0.8;
        }

        &.view-btn {
          background-color: #28a745;
          color: white;
        }

        &.edit-btn {
          background-color: #ffc107;
          color: #212529;
        }

        &.delete-btn {
          background-color: #dc3545;
          color: white;
        }

        .web-icons {
          margin-right: 0.5rem;
          width: 1.8rem;
          height: 1.8rem;
        }
      }
    }
  }
}
</style>
