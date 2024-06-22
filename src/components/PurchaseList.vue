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
            <td colspan="10">No records found.</td>
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
              <button class="action-btn delete-btn" @click="openConfirmationDialogbox(purchase.PO)">
                <span class="material-icons">delete</span> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <PurchaseForm
        v-if="isFormVisible"
        :purchase="selectedPurchase"
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
import PurchaseForm from '@/components/PurchaseForm.vue'
import { useAuthStore } from '@/stores/auth'
import useNotification from '@/service/notificationService'
import DialogBox from '@/components/DialogBox.vue'
import useDialog from '@/service/useDialog'

const { dialogTitle, dialogMessage, dialogId, dialogButtons, dialogVisible } = useDialog()

const openConfirmationDialogbox = (PO) => {
  dialogTitle.value = 'Confirm Action'
  dialogMessage.value = 'Are you sure that you want to delete PO ' + PO + '?'
  dialogId.value = PO
  dialogButtons.value = ['Yes', 'No']
  dialogVisible.value = true
}

const { notify } = useNotification()
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
        limit: 10,
        sortBy: 'Pdate',
        sortOrder: 'desc'
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authStore.token}`
      },
      withCredentials: true
    })
    purchases.value = response.data.data
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

const closeForm = () => {
  isFormVisible.value = false
}

const handleAfterDialogConfirm = async (option) => {
  dialogVisible.value = false
  if (option === 'Yes' && dialogId.value) {
    try {
      const response = await axios.delete(`${siteUrl}/api/purchase/delete?PO=${dialogId.value}`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      })

      if (response.status === 200) {
        fetchPurchases()
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
    height: 68vh;
    width: 100%;
    overflow: auto;

    .purchase-table {
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
