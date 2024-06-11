<template>
  <div class="container">
    <div class="header">
      <button class="add-record-btn" @click="showAddForm">Add Record</button>
    </div>
    <div class="table-container">
      <table class="purchase-table">
        <thead>
          <tr>
            <th>PO</th>
            <th>Date</th>
            <th>Item List</th>
            <th>Description</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Qty</th>
            <th>Price</th>
            <th>User</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="purchases.length === 0">
            <td colspan="9">No records found.</td>
          </tr>
          <tr v-for="purchase in purchases" :key="purchase.PO">
            <td>{{ purchase.PO }}</td>
            <td>{{ purchase.Pdate }}</td>
            <td>{{ purchase.item_list }}</td>
            <td>{{ purchase.material_desc }}</td>
            <td>{{ purchase.category }}</td>
            <td>{{ purchase.s_name }}</td>
            <td>{{ purchase.qty }}</td>
            <td>{{ purchase.p_price }}</td>
            <td>{{ purchase.user }}</td>
            <td class="action-buttons">
              <button class="action-btn view-btn" @click="viewRecord(purchase)">
                <span class="material-icons">visibility</span> View
              </button>
              <button class="action-btn edit-btn" @click="editRecord(purchase)">
                <span class="material-icons">edit</span> Edit
              </button>
              <button class="action-btn delete-btn" @click="deleteRecord(purchase.PO)">
                <span class="material-icons">delete</span> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Conditionally render the PurchaseForm component -->
      <PurchaseForm
        v-if="isFormVisible"
        :purchase="selectedPurchase"
        :mode="formMode"
        @close="closeForm"
        @refresh="fetchPurchases"
      />

      <!-- 
      <PurchaseForm
        v-if="isFormVisible"
        :purchase="selectedPurchase"
        @close="closeForm"
        @refresh="fetchPurchases"
      /> -->
    </div>
  </div>
</template>

<script setup>
// import { ref, onMounted } from 'vue'
// import axios from 'axios'
// import PurchaseForm from '@/components/PurchaseForm.vue'
// import { useAuthStore } from '@/stores/auth'

// const purchases = ref([])
// const isFormVisible = ref(false)
// const selectedPurchase = ref(null)
// const authStore = useAuthStore()
// const siteUrl = import.meta.env.VITE_API_URL

// const fetchPurchases = async () => {
//   try {
//     const response = await axios.get(`${siteUrl}/api/purchase/list`, {
//       params: {
//         page: 1,
//         limit: 30,
//         sortBy: 'PO',
//         sortOrder: 'asc'
//       },
//       headers: {
//         Accept: 'application/json',
//         Authorization: `Bearer ${authStore.token}` // Ensure token is formatted correctly
//       },
//       withCredentials: true // Include credentials (cookies)
//     })

//     purchases.value = response.data.data // Assign fetched data to purchases
//   } catch (error) {
//     console.error('Error fetching purchases:', error)
//   }
// }

// const showAddForm = () => {
//   selectedPurchase.value = null
//   isFormVisible.value = true
// }

// const viewRecord = (purchase) => {
//   selectedPurchase.value = purchase

//   isFormVisible.value = true

//   //alert(`Viewing record: ${purchase.PO}`)
// }

// const editRecord = (purchase) => {
//   selectedPurchase.value = purchase
//   isFormVisible.value = true
// }

// const deleteRecord = async (id) => {
//   alert(`Viewing record: ${id}`)
//   try {
//     await axios.delete(`${siteUrl}/api/purchase/delete?PO=${id}`, {
//       //http://localhost:8000/api/purchase/delete?PO=1015
//       headers: {
//         Authorization: `Bearer ${authStore.token}` // Ensure token is formatted correctly
//       }
//     })
//     fetchPurchases()
//   } catch (error) {
//     console.error('Error deleting purchase:', error)
//   }
// }

// const closeForm = () => {
//   isFormVisible.value = false
// }

// onMounted(fetchPurchases)

import { ref, onMounted } from 'vue'
import axios from 'axios'
import PurchaseForm from '@/components/PurchaseForm.vue'
import { useAuthStore } from '@/stores/auth'

const purchases = ref([])
const isFormVisible = ref(false)
const selectedPurchase = ref(null)
const formMode = ref('entry') // 'entry', 'edit', 'view'
const authStore = useAuthStore()
const siteUrl = import.meta.env.VITE_API_URL

const fetchPurchases = async () => {
  try {
    const response = await axios.get(`${siteUrl}/api/purchase/list`, {
      params: {
        page: 1,
        limit: 30,
        sortBy: 'PO',
        sortOrder: 'asc'
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authStore.token}` // Ensure token is formatted correctly
      },
      withCredentials: true // Include credentials (cookies)
    })

    purchases.value = response.data.data // Assign fetched data to purchases
  } catch (error) {
    console.error('Error fetching purchases:', error)
  }
}

const showAddForm = () => {
  selectedPurchase.value = null
  formMode.value = 'entry'
  isFormVisible.value = true
}

const viewRecord = (purchase) => {
  selectedPurchase.value = purchase
  formMode.value = 'view'
  isFormVisible.value = true
}

const editRecord = (purchase) => {
  selectedPurchase.value = purchase
  formMode.value = 'edit'
  isFormVisible.value = true
}

const deleteRecord = async (id) => {
  alert(`Viewing record: ${id}`)
  try {
    await axios.delete(`${siteUrl}/api/purchase/delete?PO=${id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}` // Ensure token is formatted correctly
      }
    })
    fetchPurchases()
  } catch (error) {
    console.error('Error deleting purchase:', error)
  }
}

const closeForm = () => {
  isFormVisible.value = false
}

onMounted(fetchPurchases)
</script>

<style scoped lang="scss">
.container {
  margin-top: 0;
  padding-left: 40px;

  .header {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 5px;

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
  }

  .table-container {
    display: flex;
    flex-direction: column;
    height: 68vh; /* Set height for scrollable container */
    width: 100%;
    overflow: auto; /* Enable scrolling */

    .purchase-table {
      width: 100%;
      border-collapse: collapse;
      text-align: center;

      th {
        background-color: #e5b2a5;
        padding: 15px 2px;
        font-size: 14px;
        position: sticky; /* Make headers sticky */
        top: 0; /* Stick to the top of the table container */
        height: 40px; /* Set fixed height for header cells */
        white-space: nowrap; /* Prevent text wrapping */
        border-bottom: 2px solid silver; /* Add bottom border to header */
      }

      td {
        padding: 5px;
        font-size: 14px;
        height: 40px; /* Set fixed height for table data cells */
        white-space: nowrap; /* Prevent text wrapping */
        overflow: hidden; /* Hide overflow text */
        text-overflow: ellipsis; /* Add ellipsis for overflow text */
        border-left: 1px solid rgb(243, 71, 3); /* Add vertical thin lines between columns */
        &:first-child {
          border-left: none; /* Remove border from the first column */
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
