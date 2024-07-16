<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ title }}</h2>
      </div>
      <div class="modal-body">
        <p>{{ message }}</p>
      </div>
      <div class="modal-footer">
        <button
          v-for="(button, index) in buttons"
          :key="index"
          @click="handleAction(button)"
          :class="getButtonClass(button)"
          class="btn"
        >
          <component :is="getButtonIcon(button)" class="web-icons" />
          {{ button }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { RiCheckboxCircleLine, RiCloseLine, RiCloseCircleLine, RiMore2Line } from '@remixicon/vue'

const { title, message, buttons, visible } = defineProps({
  title: String,
  message: String,
  buttons: Array,
  visible: Boolean
})

const emit = defineEmits(['confirm'])

const handleAction = (action) => {
  emit('confirm', action)
}

const getButtonClass = (button) => {
  switch (button.toLowerCase()) {
    case 'yes':
      return 'btn-yes'
    case 'no':
      return 'btn-no'
    case 'cancel':
      return 'btn-cancel'
    default:
      return 'btn-others'
  }
}

const getButtonIcon = (button) => {
  switch (button.toLowerCase()) {
    case 'yes':
      return RiCheckboxCircleLine // Remix Icon component for "yes" button
    case 'no':
      return RiCloseCircleLine // Remix Icon component for "no" button
    case 'cancel':
      return RiCloseLine // Remix Icon component for "cancel" button
    default:
      return RiMore2Line // Default Remix Icon component
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease;

  &.fade-enter-active,
  &.fade-leave-active {
    opacity: 1;
  }

  &.fade-enter,
  &.fade-leave-to {
    opacity: 0;
  }
}

.modal-content {
  background: white;
  padding: 0;
  border-radius: 1rem;
  width: 35rem;
  max-width: 90%;
  text-align: center;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.modal-header {
  background-color: #021552;
  padding: 1rem;
  border-radius: 1rem 1rem 0 0;

  h2 {
    margin: 0;
    text-align: left;
    font-size: 1.8rem;
    color: #fff;
  }
}

.modal-body {
  padding: 2rem;

  p {
    margin: 0;
    font-size: 1.6rem;
    color: #141313;
  }
}

.modal-footer {
  display: flex;
  justify-content: space-around;
  padding: 1rem 0;
}

.btn {
  flex: 1;
  min-width: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  margin: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 0.4rem;
  font-size: 1.6rem;
  transition: background-color 0.3s ease;

  .web-icons {
    width: 2.4rem;
    height: 2.4rem;
    margin-right: 0.5rem;
  }
}

.btn-yes {
  background-color: #28a745;
  color: white;
}

.btn-no {
  background-color: #dc3545;
  color: white;
}

.btn-cancel {
  background-color: #6c757d;
  color: white;
}

.btn-others {
  background-color: #6c757d;
  color: white;
}
</style>
