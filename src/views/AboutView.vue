<template>
  <div>
    <DateRange @dateRangeSelected="handleDateRangeSelected" />
    <!-- Other content -->
  </div>
</template>

<script setup>
import DateRange from '@/components/DateRange.vue'

const handleDateRangeSelected = ({ startDate, endDate }) => {
  // Handle the selected date range data
  console.log('Selected Date Range:', startDate, endDate)
  // Perform any other actions as needed
}
</script>
