<template>
  <div>
    <div class="icon-container">
      <p>Remix Icon</p>
      <RiHeartFill class="my-icon heart-icon" />
      <RiHome5Fill class="my-icon home-icon" />
    </div>
    <div class="icon-example">
      <p>Phosphor Icon</p>
      <PhCaretDown />
    </div>
  </div>
</template>

<script setup>
import { RiHeartFill, RiHome5Fill } from '@remixicon/vue'
import { PhCaretDown } from '@phosphor-icons/vue'
</script>

<style lang="scss" scoped>
.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh; /* Adjust height as needed */
  flex-direction: column; /* Align text and icons vertically */
}

.my-icon {
  margin: 0 1rem; /* Add spacing between icons if needed */
}

.icon-example {
  display: flex;
  flex-direction: column; /* Align text and icon vertically */
  justify-content: center;
  align-items: center;
  font-size: 2.4rem; /* Adjust the size as needed */
  color: green; /* Adjust the color as needed */
  height: 50vh; /* Adjust the height as needed */
}

.heart-icon {
  color: blue;
  width: 6.4rem; /* Set width */
  height: 6.4rem; /* Set height */
}

.home-icon {
  color: red;
  width: 3.2rem; /* Set width */
  height: 3.2rem; /* Set height */
}
</style>
