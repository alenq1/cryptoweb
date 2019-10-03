import {
    LOADING_COINCHANGE,
    COINCHANGE_READY,
    ERROR_GET_COINCHANGE
} from '../constants/action-types';


const initialState = {
    coinChangeData: localStorage.getItem('coinChangedata')
        ? JSON.parse(localStorage.getItem('coinChangedata'))
        : [],
    error: '',
    loadingch: false
};

const xChangeReducer = (state = initialState, action) => {
    //console.log(action.payload, "PAYLOAD PARA CAMBIAR")
    switch (action.type) {
        case LOADING_COINCHANGE:
            return {
                ...state,
                loadingch: true,
                coinChangeData: []
            };
        case ERROR_GET_COINCHANGE:
            return {
                ...state,
                loadingch: false,
                error: action.payload
            };

        case COINCHANGE_READY:
            return {
                ...state,
                loadingch: false,
                coinChangeData: action.payload
            };
        default:
            return state;
    }
};
export default xChangeReducer;
