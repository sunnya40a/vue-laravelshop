<template>
  <div class="container">
    <div class="bar">
      <div>
        <SearchComp @search="handleSearchText" />
      </div>
      <button class="add-record-btn" @click="showAddForm">Add Record</button>
    </div>
    <div class="table-container">
      <table class="list-table">
        <thead>
          <tr>
            <th>Category Code</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="categories.length === 0">
            <td colspan="10">No records found.</td>
          </tr>
          <tr v-for="category in categories" :key="category.category_code">
            <td>{{ category.category_code }}</td>
            <td>{{ category.description }}</td>
            <td class="action-buttons">
              <button class="action-btn view-btn" @click="viewRecord(category)">
                <span class="material-icons">visibility</span> View
              </button>
              <button class="action-btn edit-btn" @click="editRecord(category)">
                <span class="material-icons">edit</span> Edit
              </button>
              <button
                class="action-btn delete-btn"
                @click="openConfirmationDialogbox(category.category_code, category.description)"
              >
                <span class="material-icons">delete</span> Delete
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
      <CategoryForm
        v-if="isFormVisible"
        :category="selectedCategory"
        :mode="formMode"
        @close="closeForm"
        @refresh="fetchCategories"
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
import CategoryForm from '@/components/CategoryForm.vue'
import SearchComp from '@/components/SearchComp.vue'
import { useAuthStore } from '@/stores/auth'
import useNotification from '@/service/notificationService'
import DialogBox from '@/components/DialogBox.vue'
import useDialog from '@/service/useDialog'
import Pagination from '@/components/PaginatioN.vue'

const { dialogTitle, dialogMessage, dialogId, dialogButtons, dialogVisible } = useDialog()

const openConfirmationDialogbox = (category_code, description) => {
  dialogTitle.value = 'Confirm Action'
  dialogMessage.value =
    'Are you sure that you want to delete category ' + description + '(' + category_code + ')?'
  dialogId.value = category_code
  dialogButtons.value = ['Yes', 'No']
  dialogVisible.value = true
}

const { notify } = useNotification()
const categories = ref([])
const isFormVisible = ref(false)
const selectedCategory = ref(null)
const formMode = ref('entry') // 'entry', 'edit', 'view'
const authStore = useAuthStore()
const siteUrl = import.meta.env.VITE_API_URL
const currentPage = ref(1)
const limit = ref(10)
const searchQuery = ref('')
const sortByField = ref('category_code')
const sortDirection = ref('asc')

let totalRecords = ref(0)
let totalPageCount = ref(1)

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${siteUrl}/api/categories/list`, {
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
    categories.value = response.data.data
    totalRecords.value = response.data.TotalRecords
    totalPageCount.value = Math.ceil(response.data.TotalRecords / limit.value)
  } catch (error) {
    console.error('Error fetching purchases:', error)
  }
}

const handlePageChange = (pageNumber) => {
  currentPage.value = pageNumber
  fetchCategories()
}

const handlePerPageChange = (perPage) => {
  limit.value = perPage
  currentPage.value = 1
  fetchCategories()
}

const handleSearchText = (searchText) => {
  searchQuery.value = searchText
  fetchCategories()
}

const showAddForm = () => {
  selectedCategory.value = null
  formMode.value = 'entry'
  isFormVisible.value = true
}

const viewRecord = (category) => {
  selectedCategory.value = category
  formMode.value = 'view'
  isFormVisible.value = true
}

const editRecord = (category) => {
  selectedCategory.value = category
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
        `${siteUrl}/api/categories/delete?code=${dialogId.value}`,
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        }
      )

      if (response.status === 200) {
        fetchCategories()
        notify(response.data.message, 'success')
      } else {
        notify(
          `Failed to delete PO ${dialogId.value}. Server responded with: ${response.status}`,
          'error'
        )
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        notify(error.response.data.message, 'info')
      } else if (error.response && error.response.status === 500) {
        notify(error.response.data.message, 'error')
      } else {
        notify("Couldn't delete record on server. Please try again later.", 'error')
      }
    }
  }
}

onMounted(fetchCategories)
</script>

<style scoped lang="scss">
.container {
  margin-top: 0;
  padding-left: 50px;
  padding-right: 10px;

  .bar {
    display: flex;
    justify-content: space-between; /* Align items horizontally with space between */
    align-items: center;
    margin: 10px 0;
    padding: 10px, 0px;
  }

  .searcharea {
    flex: 1; /* Allow search area to grow and fill available space */

    .search-box {
      height: 30px; /* Set desired height */
      padding: 0 10px; /* Add padding for better look */
      font-size: 16px; /* Increase font size for better readability */
      border: 1px solid #ccc; /* Add border */
      border-radius: 10px; /* Add border radius */
    }
    .search-icon {
      position: relative;
      top: 20px;
      left: -30px;
      transform: translateY(-40%);
      font-size: 25px;
      color: #aaa; /* Adjust icon color */
      pointer-events: none; /* Ensure icon is not clickable */
    }
  }

  .add-record-btn {
    padding: 10px 20px;
    font-size: 14px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }

  .table-container {
    display: flex;
    flex-direction: column;
    height: 80vh;
    width: 100%;
    overflow: auto;

    .list-table {
      width: 100%;
      border-collapse: collapse;
      text-align: center;

      th {
        background-color: #e5b2a5;
        padding: 15px 2px;
        font-size: 14px;
        position: sticky;
        top: 0;
        height: 40px;
        white-space: nowrap;
        border-bottom: 2px solid silver;
      }

      td {
        padding: 5px;
        font-size: 14px;
        height: 40px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-left: 1px solid rgb(243, 71, 3);

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
        gap: 5px;
      }

      .action-btn {
        padding: 15px 8px;
        border: none;
        cursor: pointer;
        border-radius: 4px;
        font-size: 14px;
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

        .material-icons {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
