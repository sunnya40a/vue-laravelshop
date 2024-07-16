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

      <div class="navbar">
        <div class="navbuttons">
          <!-- First Page -->
          <li class="page-item" :class="{ disabled: currentPage === 1 || totalRecords === 0 }">
            <a class="page-link" href="#" @click.prevent="firstPage" aria-label="First Page">
              <RiSkipLeftFill class="web-icons" />
            </a>
          </li>

          <!-- Previous Page -->
          <li class="page-item" :class="{ disabled: currentPage === 1 || totalRecords === 0 }">
            <a class="page-link" href="#" @click.prevent="prevPage" aria-label="Previous Page">
              <RiArrowLeftSFill class="web-icons" />
            </a>
          </li>
        </div>
        <div class="pagelink">
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
        </div>
        <div class="navbuttons">
          <!-- Next Page -->
          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPageCount || totalRecords === 0 }"
          >
            <a class="page-link" href="#" @click.prevent="nextPage" aria-label="Next Page">
              <RiArrowRightSFill class="web-icons" />
            </a>
          </li>

          <!-- Last Page -->
          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPageCount || totalRecords === 0 }"
          >
            <a class="page-link" href="#" @click.prevent="lastPage" aria-label="Last Page">
              <RiSkipRightFill class="web-icons" />
            </a>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import {
  RiSkipLeftFill,
  RiArrowLeftSFill,
  RiArrowRightSFill,
  RiSkipRightFill
} from '@remixicon/vue'

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
  align-items: center;
  background-color: #9df1af;
  padding: 0.2rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.2);
  gap: 1rem; /* Added gap between the dropdown and pagination controls */

  .results-per-page {
    display: flex;
    align-items: center;
    font-size: 1rem;
    margin-right: 1rem; /* Add margin-right to ensure spacing from pagination */

    label {
      margin-right: 0.5rem;
      font-weight: bold;
    }

    select {
      padding: 0.25rem;
      font-size: 1rem;
      border: 0.1rem solid #ddd;
      border-radius: 0.25rem;
      background-color: #fff;
      width: 4rem; /* Adjust width for better alignment */
    }
  }

  .pagination {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    gap: 0.5rem; /* Added gap between pagination items */

    .Records {
      font-size: 1rem; /* Adjust font size */
      font-weight: bolder;
      color: rgb(53, 47, 47);
      margin: 0 0.5rem;
    }

    .pagenumber {
      font-size: 1rem;
      font-weight: bolder;
      color: rgb(53, 47, 47);
      margin: 0 0.5rem;
    }

    .navbar {
      display: flex;
      align-items: center;
      gap: 0.5rem; /* Gap between buttons and links */

      .navbuttons {
        display: flex;
        align-items: center;
        //gap: 0.1rem; /* Space between navigation buttons */

        .page-item {
          .page-link {
            display: flex;
            align-items: center;
            color: var(--active-button-color);
            transition:
              background-color 0.2s ease,
              color 0.2s ease;

            &:hover {
              //background-color: #ddd; /* Slightly darker on hover */
              color: var(--hover-button-color);
            }

            &:focus {
              outline: none;
            }

            .web-icons {
              width: 2.5rem;
              height: 2.5rem; /* Adjust icon size */
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
            font-size: 1.1rem; /* Slightly larger font for active page */
          }
        }
      }

      .pagelink {
        display: flex;
        align-items: center;
        gap: 0.1rem; /* Space between page links */

        .page-item {
          .page-link {
            display: flex;
            align-items: center;
            padding: 0.6rem 0.5rem; /* Adjust padding for page links */
            text-decoration: none;
            font-size: 1rem; /* Adjust font size */
            font-weight: bolder;
            color: #007bff;
            border: 0.1rem solid #ddd;
            border-radius: 0.25rem;
            background-color: #f2f2f2; /* Lighter background for links */
            transition:
              background-color 0.2s ease,
              color 0.2s ease;

            &:hover {
              background-color: #ddd; /* Slightly darker on hover */
              color: #0056b3;
            }

            &:focus {
              outline: none;
            }
          }

          &.active .page-link {
            background-color: #36a05e;
            color: white;
            pointer-events: none;
            font-size: 1.1rem; /* Slightly larger font for active page */
          }
        }
      }
    }
  }
}
</style>
