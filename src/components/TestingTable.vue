<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>PO</th>
          <th>Pdate</th>
          <th>SortByDate</th>
          <th>Item List</th>
          <th>Material Description</th>
          <th>Quantity</th>
          <th>Unit</th>
          <th>Total Price</th>
          <th>User</th>
          <th>Category</th>
          <th>Supplier Name</th>
          <th>Payment Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index" :class="{ 'even-row': index % 2 === 0 }">
          <td>{{ item.PO }}</td>
          <td>{{ formatDate(item.Pdate) }}</td>
          <td>{{ formatDate(item.SortByDate) }}</td>
          <td>{{ item.item_list }}</td>
          <td>{{ item.material_desc }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ item.unit }}</td>
          <td>{{ formatCurrency(item.p_price) }}</td>
          <td>{{ item.user }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.s_name }}</td>
          <td>{{ item.payment_status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TestingTable',
  data() {
    return {
      data: [
        {
          PO: 10120,
          Pdate: '2022-02-10',
          SortByDate: '2022-02-10',
          item_list: 'DPD - 007',
          material_desc: 'Testing-2',
          qty: 10,
          unit: 'LTR',
          p_price: 59,
          user: 'Chhabi',
          category: 'Dairy Products',
          s_name: 'Supplier Two',
          payment_status: 'On Credit'
        },
        {
          PO: 10121,
          Pdate: '2022-02-10',
          SortByDate: '2022-02-10',
          item_list: 'DPD - 007',
          material_desc: 'Testing-2',
          qty: 10,
          unit: 'LTR',
          p_price: 59,
          user: 'Chhabi',
          category: 'Dairy Products',
          s_name: 'Supplier Two',
          payment_status: 'On Credit'
        },
        {
          PO: 1015,
          Pdate: '2022-02-10',
          SortByDate: '2022-02-10',
          item_list: 'DPD - 007',
          material_desc: 'Testing',
          qty: 10,
          unit: 'LTR',
          p_price: 500,
          user: 'user',
          category: 'Dairy Products',
          s_name: 'Supplier Two',
          payment_status: 'On Credit'
        },
        {
          PO: 1019,
          Pdate: '2022-02-10',
          SortByDate: '2022-02-10',
          item_list: 'DPD - 007',
          material_desc: 'Testing-2',
          qty: 10,
          unit: 'LTR',
          p_price: 500,
          user: 'Chhabi',
          category: 'Dairy Products',
          s_name: 'Supplier Two',
          payment_status: 'On Credit'
        },
        {
          PO: 1016,
          Pdate: '2022-02-12',
          SortByDate: '2022-02-12',
          item_list: 'DPD - 007',
          material_desc: 'Testing',
          qty: 10,
          unit: 'LTR',
          p_price: 500,
          user: 'user',
          category: 'Dairy Products',
          s_name: 'Supplier Two',
          payment_status: 'On Credit'
        },
        {
          PO: 10001,
          Pdate: '2022-02-15',
          SortByDate: '2022-02-15',
          item_list: 'DPD - 007',
          material_desc: 'Testing',
          qty: 10,
          unit: 'LTR',
          p_price: 584,
          user: 'user',
          category: 'Dairy Products',
          s_name: 'Supplier Two',
          payment_status: 'On Credit'
        },
        {
          PO: 10002,
          Pdate: '2022-08-15',
          SortByDate: '2022-08-15',
          item_list: 'DPD - 001',
          material_desc: 'Testing',
          qty: 50,
          unit: 'LTR',
          p_price: 584,
          user: 'user',
          category: 'Dairy Products',
          s_name: 'Supplier Two',
          payment_status: 'On Credit'
        },
        {
          PO: 10003,
          Pdate: '2023-02-15',
          SortByDate: '2023-02-15',
          item_list: 'DPD - 008',
          material_desc: 'Testing',
          qty: 50,
          unit: 'LTR',
          p_price: 584,
          user: 'user',
          category: 'Dairy Products',
          s_name: 'Supplier Two',
          payment_status: 'On Credit'
        },
        {
          PO: 10005,
          Pdate: '2024-01-15',
          SortByDate: '2024-01-15',
          item_list: 'DPD - 008',
          material_desc: 'Testing',
          qty: 50,
          unit: 'LTR',
          p_price: 584,
          user: 'Chalise',
          category: 'Dairy Products',
          s_name: 'supplier one',
          payment_status: 'On Credit'
        },
        {
          PO: 10006,
          Pdate: '2024-01-25',
          SortByDate: '2024-01-25',
          item_list: 'DPD - 008',
          material_desc: 'Testing',
          qty: 50,
          unit: 'LTR',
          p_price: 584,
          user: 'Chalise',
          category: 'Dairy Products',
          s_name: 'Supplier Two',
          payment_status: 'On Credit'
        }
      ]
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    formatCurrency(value) {
      return `$${parseFloat(value).toFixed(2)}`
    }
  }
}
</script>

<style scoped lang="scss">
.table-container {
  width: 90vw;
  height: 70vh;
  overflow: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 2px solid #ddd;
  border-radius: 8px;
  table-layout: fixed; /* Ensure table layout is fixed for sticky headers */

  th,
  td {
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
    font-size: 14px;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
    text-transform: uppercase;
    position: sticky; /* Make headers sticky */
    top: 0; /* Stick to the top of the table container */
    //z-index: 1; /* Ensure headers appear above other content */
  }

  td {
    background-color: #fff;
  }

  tr.even-row {
    background-color: #f9f9f9;
  }

  tbody tr:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
}
</style>
