import { GET_DATA, ERROR_GET, SORTED } from '../constants/action-types';


const initialState = {
  //
  apiData: localStorage.getItem('apiData')
    ? JSON.parse(localStorage.getItem('apiData'))
    : [0],
  sortKey: 'marketCap',
  sortDirection: 'desc'
};



const apiDataReducer = (state = initialState, action) => {
  //console.log(action.payload, "PAYLOAD PARA CAMBIAR")

  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        apiData: action.payload
      };
    case ERROR_GET:
      return {
        ...state,
        apiData: action.payload
      };

    case SORTED:
      return {
        ...state,
        sortKey: action.payload.sortKey,
        sortDirection: action.payload.sortDirection
      };
    default:
      return state;
  }
};

export default apiDataReducer;
