<template>
  <div style="margin-left: 50px; font-size: 2rem">
    <PurchaseTable :items="items" />
  </div>
</template>

<script setup>
import PurchaseTable from '../components/PurchaseTable.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { parseISO, format } from 'date-fns'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

const siteurl = import.meta.env.VITE_API_URL

const isMounted = ref(true)
const items = ref([])
const authstore = useAuthStore()

onMounted(async () => {
  try {
    const response = await axios.get(`${siteurl}/api/purchase/list`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: authstore.token // Use the stored token
      },
      withCredentials: true // Include credentials (cookies)
    })

    const responseData = response.data

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    if (isMounted.value) {
      if (responseData.data) {
        items.value = responseData.data
        // Modify the Pdate field for each item using date-fns
        items.value = items.value.map((item) => {
          try {
            const itemDate = parseISO(item.Pdate)
            const formattedDate = format(itemDate, 'dd/MM/yyyy')
            return {
              ...item,
              Pdate: formattedDate
            }
          } catch (error) {
            console.error(
              `Error parsing or formatting date for item with Pdate: ${item.Pdate}`,
              error
            )
            return item
          }
        })

        // Uncomment the following line if you want to see the modified items
        // console.log(items.value)
      } else {
        console.error('Error: response data is not defined.')
      }
    }
  } catch (error) {
    if (isMounted.value) {
      console.error('Error fetching data:', error)
    }
  }
})

onUnmounted(() => {
  isMounted.value = false
})
</script>
<style lang="scss" scoped></style>
