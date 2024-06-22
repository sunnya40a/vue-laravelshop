import { ref } from 'vue'

const dialogTitle = ref('')
const dialogMessage = ref('')
const dialogId = ref('')
const dialogButtons = ref([])
const dialogVisible = ref(false)

const openDialog = (title, message, id, buttons = ['Yes', 'No', 'Cancel']) => {
  dialogTitle.value = title
  dialogMessage.value = message
  dialogId.value = id
  dialogButtons.value = buttons
  dialogVisible.value = true

  return new Promise((resolve) => {
    const handleConfirm = (option) => {
      dialogVisible.value = false
      resolve(option)
    }

    dialogVisible.value = handleConfirm
  })
}

const useDialog = () => {
  return {
    dialogTitle,
    dialogMessage,
    dialogId,
    dialogButtons,
    dialogVisible,
    openDialog
  }
}

export default useDialog
