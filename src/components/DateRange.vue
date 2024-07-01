<template>
  <div class="radio-group">
    <div class="radio-option">
      <input id="all" type="radio" name="timeframe" value="all" checked @change="timefilter" />
      <label for="all">All</label>
    </div>

    <div class="radio-option">
      <input id="lastYear" type="radio" name="timeframe" value="lastYear" @change="timefilter" />
      <label for="lastYear">Last Year</label>
    </div>

    <div class="radio-option">
      <input id="thisYear" type="radio" name="timeframe" value="thisYear" @change="timefilter" />
      <label for="thisYear">This Year</label>
    </div>

    <div class="radio-option">
      <input id="lastMonth" type="radio" name="timeframe" value="lastMonth" @change="timefilter" />
      <label for="lastMonth">Last Month</label>
    </div>

    <div class="radio-option">
      <input id="thisMonth" type="radio" name="timeframe" value="thisMonth" @change="timefilter" />
      <label for="thisMonth">This Month</label>
    </div>

    <div class="radio-option">
      <input id="lastWeek" type="radio" name="timeframe" value="lastWeek" @change="timefilter" />
      <label for="lastWeek">Last Week</label>
    </div>

    <div class="radio-option">
      <input id="thisWeek" type="radio" name="timeframe" value="thisWeek" @change="timefilter" />
      <label for="thisWeek">This Week</label>
    </div>

    <div class="radio-option">
      <input id="today" type="radio" name="timeframe" value="today" @change="timefilter" />
      <label for="today">Today</label>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['dateRangeSelected'])

const timefilter = (e) => {
  const { startDate, endDate } = calculateDateRange(e.target.value)
  emit('dateRangeSelected', { startDate, endDate })
}

const calculateDateRange = (timeframe) => {
  const currentDate = new Date()
  let startDate, endDate

  switch (timeframe) {
    case 'lastYear':
      startDate = new Date(currentDate.getFullYear() - 1, 0, 1)
      endDate = new Date(currentDate.getFullYear() - 1, 11, 31)
      break
    case 'thisYear':
      startDate = new Date(currentDate.getFullYear(), 0, 1)
      endDate = new Date()
      break
    case 'lastMonth':
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)
      break
    case 'thisMonth':
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
      endDate = new Date()
      break
    case 'lastWeek':
      startDate = new Date(currentDate)
      startDate.setDate(currentDate.getDate() - currentDate.getDay() - 7)
      endDate = new Date(startDate)
      endDate.setDate(startDate.getDate() + 6)
      break
    case 'thisWeek':
      startDate = new Date(currentDate)
      startDate.setDate(currentDate.getDate() - currentDate.getDay())
      endDate = new Date(startDate)
      endDate.setDate(startDate.getDate() + 6)
      break
    case 'today':
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
      break
    default:
      startDate = null
      endDate = null
      break
  }

  return { startDate, endDate }
}
</script>

<style lang="scss" scoped>
/* General styling for radio buttons and labels */
.radio-group {
  display: flex;
  gap: 2.5rem; /* Increased gap between radio options */
  padding: 1rem; /* Padding to create space between content and border */
  /*border: 0.1rem solid #ccc; /* Simple border around the component */
}

.radio-option {
  display: flex;
  align-items: center;
}

input[type='radio'] {
  width: 1.8rem;
  height: 1.8rem;
  border: 0.2rem solid #ccc;
  margin-right: 0.5rem; /* Adjusted margin between radio button and label */
  cursor: pointer;
}

input[type='radio']:checked {
  background-color: #007bff;
  border-color: #007bff;
}

label {
  font-family: sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
}
</style>
