import 'regenerator-runtime/runtime'
import { store, getUser } from './store'

window.getUser = getUser
window.store = store
