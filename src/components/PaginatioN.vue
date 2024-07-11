<template>
  <div class="navigation-container">
    <div class="results-per-page">
      <label for="perPage">Results per page:</label>
      <select id="perPage" :value="perPage" @change="perPageChanged">
        <option v-for="option in perPageOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div class="pagination">
      <!-- Page Number Display -->
      <span v-if="totalRecords > 0" class="pagenumber">
        Page {{ currentPage }} of {{ totalPageCount }}
      </span>
      <span class="Records">(Total Records: {{ totalRecords }})</span>

      <!-- First Page -->
      <li class="page-item" :class="{ disabled: currentPage === 1 || totalRecords === 0 }">
        <a class="page-link" href="#" @click.prevent="firstPage" aria-label="First Page">
          <font-awesome-icon icon="fa-solid fa-backward-fast" class="fa-icons" />
        </a>
      </li>

      <!-- Previous Page -->
      <li class="page-item" :class="{ disabled: currentPage === 1 || totalRecords === 0 }">
        <a class="page-link" href="#" @click.prevent="prevPage" aria-label="Previous Page">
          <font-awesome-icon icon="fa-solid fa-backward-step" class="fa-icons" />
        </a>
      </li>

      <!-- Pagination Links -->
      <li
        v-for="pageNumber in totalPageCount"
        :key="pageNumber"
        class="page-item"
        :class="{ active: pageNumber === currentPage }"
      >
        <a class="page-link" href="#" @click.prevent="changePage(pageNumber)">
          {{ pageNumber }}
        </a>
      </li>

      <!-- Next Page -->
      <li
        class="page-item"
        :class="{ disabled: currentPage === totalPageCount || totalRecords === 0 }"
      >
        <a class="page-link" href="#" @click.prevent="nextPage" aria-label="Next Page">
          <font-awesome-icon icon="fa-solid fa-forward-step" class="fa-icons" />
        </a>
      </li>

      <!-- Last Page -->
      <li
        class="page-item"
        :class="{ disabled: currentPage === totalPageCount || totalRecords === 0 }"
      >
        <a class="page-link" href="#" @click.prevent="lastPage" aria-label="Last Page">
          <font-awesome-icon icon="forward-fast" class="fa-icons" />
        </a>
      </li>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPageCount: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  },
  totalRecords: {
    type: Number,
    required: true
  }
})

const perPageOptions = ref([5, 10, 20, 50])

const emit = defineEmits(['page-change', 'per-page-change'])

const nextPage = () => {
  if (props.currentPage < props.totalPageCount) {
    emit('page-change', props.currentPage + 1)
  }
}

const firstPage = () => {
  emit('page-change', 1)
}

const lastPage = () => {
  emit('page-change', props.totalPageCount)
}

const prevPage = () => {
  if (props.currentPage > 1) {
    emit('page-change', props.currentPage - 1)
  }
}

const changePage = (pageNumber) => {
  emit('page-change', pageNumber)
}

const perPageChanged = (event) => {
  const selectedPerPage = parseInt(event.target.value, 10)
  emit('per-page-change', selectedPerPage)
}
</script>

<style lang="scss" scoped>
.navigation-container {
  display: flex;
  justify-content: space-between;
  background-color: #9df1af;
  align-items: center;
  padding: 0.5rem 1rem; /* Added padding */
  border-radius: 0.5rem; /* Added border radius */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Added shadow */

  .results-per-page {
    display: flex;
    align-items: center;
    font-size: 1rem;

    label {
      margin-right: 0.5rem;
      font-weight: bold;
    }

    select {
      padding: 0.25rem;
      font-size: 1rem;
      border: 1px solid #ddd;
      border-radius: 0.25rem;
      background-color: #fff;
    }
  }

  .pagination {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;

    .Records {
      font-size: 1.2rem;
      color: gray;
      margin: 0 1rem;
    }

    .pagenumber {
      font-size: 1.2rem;
      color: gray;
    }

    .page-item {
      margin: 0;

      .page-link {
        display: flex;
        align-items: center;
        padding: 0.2rem 1rem;
        text-decoration: none;
        font-size: 1.2rem;
        color: #007bff;
        //border: 1px solid #ddd;
        //border-radius: 0.25rem;
        //background-color: #9df1af;
        transition:
          background-color 0.2s ease,
          color 0.2s ease;

        //&:hover {
        //  background-color: #f2f2f2;
        //  color: #0056b3;
        //}

        &:focus {
          outline: none;
        }

        .fa-icons {
          font-size: 1.4rem;
          margin-right: 0.1rem;
        }
      }

      &.disabled {
        pointer-events: none;
        opacity: 0.5;
      }

      &.active .page-link {
        background-color: #36a05e;
        color: white;
        pointer-events: none;
        font-size: 1.2rem;
      }
    }
  }
}
</style>
