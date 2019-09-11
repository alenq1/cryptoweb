import {
  LOADING_CHART,
  CHART_READY,
  ERROR_GET_CHART
} from '../constants/action-types';

const initialState = {
  chartData: localStorage.getItem('chartdata')
    ? JSON.parse(localStorage.getItem('chartdata'))
    : [],
  error: '',
  loadingch: false
};
const chartReducer = (state = initialState, action) => {
  //console.log(action.payload, "PAYLOAD PARA CAMBIAR")
  switch (action.type) {
    case LOADING_CHART:
      return {
        ...state,
        loadingch: true,
        chartData: []
      };
    case ERROR_GET_CHART:
      return {
        ...state,
        loadingch: false,
        error: action.payload
      };

    case CHART_READY:
      return {
        ...state,
        loadingch: false,
        chartData: [...state.chartData, action.payload]
      };
    default:
      return state;
  }
};
export default chartReducer;
