//DateRange.vue
<template>
  <input id="all" type="radio" name="timeframe" value="all" checked @change="timefilter" />
  <label for="all">All</label>

  <input id="lastYear" type="radio" name="timeframe" value="lastYear" @change="timefilter" />
  <label for="lastYear">Last Year</label>

  <input id="thisYear" type="radio" name="timeframe" value="thisYear" @change="timefilter" />
  <label for="thisYear">This Year </label>

  <input id="lastMonth" type="radio" name="timeframe" value="lastMonth" @change="timefilter" />
  <label for="lastMonth">Last Month</label>

  <input id="thisMonth" type="radio" name="timeframe" value="thisMonth" @change="timefilter" />
  <label for="thisMonth">This Month</label>

  <input id="lastWeek" type="radio" name="timeframe" value="lastWeek" @change="timefilter" />
  <label for="lastWeek">Last Week </label>

  <input id="thisWeek" type="radio" name="timeframe" value="thisWeek" @change="timefilter" />
  <label for="thisWeek">This Week </label>

  <input id="today" type="radio" name="timeframe" value="today" @change="timefilter" />
  <label for="today">Today</label>
</template>
<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['dateRangeSelected'])

const timefilter = (e) => {
  const { startDate, endDate } = calculateDateRange(e.target.value)
  //console.log('Start Date:', startDate)
  //console.log('End Date:', endDate)
  //console.log('Start Date: ' + startDate + ' End Date:' + endDate)
  emit('dateRangeSelected', { startDate, endDate })
}

const calculateDateRange = (timeframe) => {
  const currentDate = new Date()
  let startDate, endDate
  switch (timeframe) {
    case 'lastYear':
      startDate = new Date(currentDate.getFullYear() - 1, 0, 1) // Start of last year
      endDate = new Date(currentDate.getFullYear() - 1, 11, 31) // End of last year
      break
    case 'thisYear':
      startDate = new Date(currentDate.getFullYear(), 0, 1) // Start of this year
      endDate = new Date() // Current date (Today)
      break
    case 'lastMonth':
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1) // Start of last month
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0) // End of last month
      break
    case 'thisMonth':
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1) // Start of this month
      endDate = new Date() // Current date (Today)
      break
    case 'lastWeek':
      // Adjust to start of last week (last Sunday)
      startDate = new Date(currentDate)
      startDate.setDate(currentDate.getDate() - currentDate.getDay() - 7) // Start of last week (last Sunday)
      endDate = new Date(startDate)
      endDate.setDate(startDate.getDate() + 6) // End of last week (last Saturday)
      break
    case 'thisWeek':
      // Adjust to start of this week (this Sunday)
      startDate = new Date(currentDate)
      startDate.setDate(currentDate.getDate() - currentDate.getDay()) // Start of this week (this Sunday)
      endDate = new Date(startDate)
      endDate.setDate(startDate.getDate() + 6) // End of this week (this Saturday)
      break
    case 'today':
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) // Start of today
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) // End of today
      break
    default:
      startDate = ''
      endDate = ''
      break
  }

  return { startDate, endDate }
}
</script>

<style lang="scss" scoped>
/* General styling for radio buttons and labels */
input[type='radio'] {
  //-webkit-appearance: none; /* Hide the default radio button */
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  //border-radius: 50%;
  margin-right: 0px;
  margin-left: 10px; /* Adjusted margin for radio button */
  cursor: pointer;
  align-items: center;
  align-content: end;
  margin: 10px 0px;
  &:checked {
    background-color: #007bff; /* Primary color for checked state */
    border-color: #007bff;
  }
}

/* Increased space between labels */
label {
  font-family: sans-serif;
  font-size: 1.6rem;
  font-weight: 500;
  margin-right: 10px; /* Increased margin between labels */
  cursor: pointer;

  /* Subtle hover effect for labels */
  &:hover {
    color: #007bff;
  }
}

/* Align the radio buttons horizontally */
.radio-group {
  display: flex;
  align-items: self-end;
  gap: 2rem; /* Consistent spacing between buttons */
}
</style>
