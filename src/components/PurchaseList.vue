<template>
  <div class="container">
    <div class="purchase-list">
      <div class="header">
        <button class="add-record-btn" @click="showAddForm">Add Record</button>
      </div>
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
            <td>{{ purchase.supplier_id }}</td>
            <td>{{ purchase.qty }}</td>
            <td>{{ purchase.price }}</td>
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

      <PurchaseForm
        v-if="isFormVisible"
        :purchase="selectedPurchase"
        @close="closeForm"
        @refresh="fetchPurchases"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import PurchaseForm from '@/components/PurchaseForm.vue'
import { useAuthStore } from '@/stores/auth'

const purchases = ref([])
const isFormVisible = ref(false)
const selectedPurchase = ref(null)
const authStore = useAuthStore()
const siteUrl = import.meta.env.VITE_API_URL

const fetchPurchases = async () => {
  try {
    const response = await axios.get(`${siteUrl}/api/purchase/list`, {
      params: {
        page: 1,
        limit: 8,
        sortBy: 'Pdate',
        sortOrder: 'desc'
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
  isFormVisible.value = true
}

const viewRecord = (purchase) => {
  selectedPurchase.value = purchase
  isFormVisible.value = true

  //alert(`Viewing record: ${purchase.PO}`)
}

const editRecord = (purchase) => {
  selectedPurchase.value = purchase
  isFormVisible.value = true
}

const deleteRecord = async (id) => {
  alert(`Viewing record: ${id}`)
  try {
    await axios.delete(`${siteUrl}/api/purchase/delete?PO=${id}`, {
      //http://localhost:8000/api/purchase/delete?PO=1015
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

<style lang="scss" scoped>
/*@import url('https://fonts.googleapis.com/icon?family=Material+Icons');*/

.container {
  margin-top: 0px;
  padding-left: 40px;
  .purchase-list {
    display: flex;
    flex-direction: column;

    .header {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      margin-bottom: 5px;
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

    .purchase-table {
      width: 100%;
      border-collapse: collapse;
      text-align: center;
      border: 0px solid gray; // Add border to the table
      //table-layout: auto;

      td {
        padding: 5px;
        font-size: 14px;
        //border: 0.25px solid lightgray; // Add border to table cells
        text-align: center;
      }

      th {
        background-color: #e5b2a5;
        padding: 10px 2px;
        text-align: center;
        font-size: 14px;
      }

      tbody tr:nth-child(even) {
        background-color: #c9f0c0;
      }

      .action-buttons {
        display: flex;
        justify-content: center;
        gap: 5px;
      }

      .action-btn {
        padding: 4px 8px;
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
