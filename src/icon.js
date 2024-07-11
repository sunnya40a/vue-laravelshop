import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faEye,
  faEyeSlash,
  faMagnifyingGlass,
  faTrash,
  faCartShopping,
  faSpinner,
  faPenToSquare,
  faPlus,
  faFloppyDisk,
  faXmarkCircle,
  faBackwardStep,
  faBackwardFast,
  faForwardStep,
  faForwardFast,
  faCheckCircle,
  faTimesCircle,
  faTimes,
  faEllipsisH,
  faAnglesRight,
  faCaretDown,
  faHouseChimney
} from '@fortawesome/free-solid-svg-icons'
//} from '@fortawesome/free-regular-svg-icons'

library.add(
  faEye,
  faEyeSlash,
  faMagnifyingGlass,
  faTrash,
  faCartShopping,
  faSpinner,
  faPenToSquare,
  faPlus,
  faFloppyDisk,
  faXmarkCircle,
  faBackwardStep,
  faBackwardFast,
  faForwardStep,
  faForwardFast,
  faCheckCircle,
  faTimesCircle,
  faTimes,
  faEllipsisH,
  faAnglesRight,
  faCaretDown,
  faHouseChimney
)

export default (app) => {
  app.component('fa-icon', FontAwesomeIcon)
}
