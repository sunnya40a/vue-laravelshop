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
          <font-awesome-icon :icon="getButtonIcon(button)" class="icon" />
          {{ button }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    title: String,
    message: String,
    buttons: Array,
    visible: Boolean
  },
  methods: {
    handleAction(action) {
      this.$emit('confirm', action)
    },
    getButtonClass(button) {
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
    },
    getButtonIcon(button) {
      switch (button.toLowerCase()) {
        case 'yes':
          return ['fas', 'check-circle'] // Font Awesome icon class for "yes" button
        case 'no':
          return ['fas', 'times-circle'] // Font Awesome icon class for "no" button
        case 'cancel':
          return ['fas', 'times'] // Font Awesome icon class for "cancel" button
        default:
          return ['fas', 'ellipsis-h'] // Default Font Awesome icon class
      }
    }
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
  border-radius: 10px;
  width: 350px;
  max-width: 90%;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.modal-header {
  background-color: #021552;
  padding: 10px;
  border-radius: 10px 10px 0 0;

  h2 {
    margin: 0;
    text-align: left;
    font-size: 18px;
    color: #fff;
  }
}

.modal-body {
  padding: 20px;

  p {
    margin: 0;
    font-size: 16px;
    color: #141313;
  }
}

.modal-footer {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
}

.btn {
  flex: 1;
  min-width: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  transition: background-color 0.3s ease;

  .icon {
    margin-right: 5px;
    font-size: 20px;
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
