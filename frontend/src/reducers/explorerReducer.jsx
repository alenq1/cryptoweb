import {
    LOADING_EXPLORER,
    GET_EXPLORER,
    ERROR_GET_EXPLORER
} from '../constants/action-types';


const initialState = {
    explorerData: localStorage.getItem('explorerData')
        ? JSON.parse(localStorage.getItem('explorerData'))
        : [],
    error: '',
    loadingch: false
};


const explorerReducer = (state = initialState, action) => {
    //console.log(action.payload, "PAYLOAD PARA CAMBIAR")
    switch (action.type) {
        case LOADING_EXPLORER:
            return {
                ...state,
                loadingch: true,
                explorerData: []
            };
        case ERROR_GET_EXPLORER:
            return {
                ...state,
                loadingch: false,
                error: action.payload
            };

        case GET_EXPLORER:
            return {
                ...state,
                loadingch: false,
                explorerData: action.payload
            };
        default:
            return state;
    }
};
export default explorerReducer;
