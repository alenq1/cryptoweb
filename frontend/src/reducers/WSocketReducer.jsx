import {
    WEBSOCKET_CONNECT, WEBSOCKET_CONNECTING, WEBSOCKET_CONNECTED,
    WEBSOCKET_MESSAGE, WEBSOCKET_DISCONNECT, WEBSOCKET_DISCONNECTED,
    WEBSOCKET_ERROR
} from '../constants/action-types';

const initialState = {
    //
    wsData: [{
        'cryptoData': localStorage.getItem('apiData')
            ? JSON.parse(localStorage.getItem('apiData'))
            : '',
        'explorerInfo': '',
        'exchangeData': ''
    }],
    error: '',
    status: 'disconnected'
};

const WSocketReducer = (state = initialState, action) => {
    //console.log(action.payload, "PAYLOAD PARA CAMBIAR")

    switch (action.type) {
        case WEBSOCKET_CONNECTING:
            return {
                ...state,
                status: 'connecting'
            };
        case WEBSOCKET_CONNECTED:
            return {
                ...state,
                status: 'connected'
            };

        case WEBSOCKET_MESSAGE:
            return {
                ...state,
                wsData: [{
                    'cryptoData': action.payload.cryptoData,
                    'explorerInfo': action.payload.explorerInfo,
                    'exchangeData': action.payload.exchangeData
                }],
                status: 'received message'
            };
        case WEBSOCKET_DISCONNECTED:
            return {
                ...state,
                status: 'disconnected'
            };

        case WEBSOCKET_ERROR:
            return {
                ...state,
                error: action.payload,
                status: 'error'
            };

        default:
            return state;
    }
};

export default WSocketReducer;
