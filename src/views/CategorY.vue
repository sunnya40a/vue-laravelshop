<template>
  <div>
    <!-- Buttons aligned to the right -->
    <div class="button-container">
      <button @click="openConfirmationDialogbox()">Open Dialog</button>
    </div>

    <DialogBox
      :title="dialogTitle"
      :message="dialogMessage"
      :buttons="dialogButtons"
      :visible="dialogVisible"
      @confirm="handleAfterDialogConfirm"
    />
  </div>
</template>

<script setup>
//import ShowDialog from '@/components/ShowDialog.vue'
import DialogBox from '@/components/DialogBox.vue'
import useDialog from '@/service/useDialog'

const { dialogTitle, dialogMessage, dialogButtons, dialogVisible } = useDialog() // Removed `ref` import as it was not used

const openConfirmationDialogbox = () => {
  dialogTitle.value = 'Confirm Action'
  dialogMessage.value = 'Are you sure?'
  dialogButtons.value = ['Yes', 'No', 'Cancel']
  dialogVisible.value = true
}

const handleAfterDialogConfirm = (option) => {
  dialogVisible.value = false // Close the dialog after handling confirmation
  console.log('Dialog confirmed:', option)
}
</script>

<style>
.button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px; /* Add margin to separate from the dialog */
}

.button-container button {
  margin-left: 10px; /* Add spacing between buttons */
}

/* Styling for ShowDialog component (optional) */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.buttons {
  margin-top: 20px;
}
</style>
