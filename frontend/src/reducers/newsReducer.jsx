import { GET_NEWS, ERROR_GET_NEWS, LOADING_FETCH, GET_LATEST } from '../constants/action-types'

const initialState = {

  datanews: [0],
  loading: false,
  error: '',
  latestnews: []

}

const newsReducer = (state = initialState, action) => {

  //console.log(action.payload, "PAYLOAD PARA CAMBIAR")
  switch (action.type) {
    case GET_NEWS:

      return {
        ...state,
        datanews: action.payload,
        loading: false

      };
    case ERROR_GET_NEWS:

      return {
        ...state,
        error: action.payload,
        loading: false
      }

    case GET_LATEST:

      return {
        ...state,
        latestnews: action.payload,
        loading: false

      }

    case LOADING_FETCH:

      return {
        ...state,
        loading: true

      }

    default:

      return state

  }
}
export default newsReducer;