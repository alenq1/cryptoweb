import {
  GET_WALLETS,
  LOADING_WALLETS,
  ERROR_GET_WALLETS
} from '../constants/action-types'

const initialState = {
  walletsData: [],
  loading: false,
  error: ''
}
const walletsReducer = (state = initialState, action) => {
  //console.log(action.payload, "PAYLOAD PARA CAMBIAR")
  switch (action.type) {
    case GET_WALLETS:
      return {
        ...state,
        walletsData: action.payload,
        loading: false
      }
    case ERROR_GET_WALLETS:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    case LOADING_WALLETS:
      return {
        ...state,
        loading: true
      }

    default:
      return state
  }
}
export default walletsReducer
