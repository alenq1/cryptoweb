import {
    WEBSOCKET_CONNECT, WEBSOCKET_CONNECTING, WEBSOCKET_CONNECTED,
    WEBSOCKET_MESSAGE, WEBSOCKET_DISCONNECT, WEBSOCKET_DISCONNECTED
} from '../constants/action-types';

const initialState = {
    //
    wsData: [],
    error: '',
    status: 'disconnected'
};

const WSocketReducer = (state = initialState, action) => {
    //console.log(action.payload, "PAYLOAD PARA CAMBIAR")

    switch (action.type) {
        case WEBSOCKET_CONNECTING:
            return {
                ...state,
                wsData: action.payload,
                status: 'connecting'
            };
        case WEBSOCKET_CONNECTED:
            return {
                ...state,
                wsData: action.payload,
                status: 'connected'
            };

        case WEBSOCKET_MESSAGE:
            return {
                ...state,
                wsData: action.payload,
                status: 'received message'
            };
        case WEBSOCKET_DISCONNECTED:
            return {
                ...state,
                wsData: action.payload,
                status: 'disconnected'
            };

        default:
            return state;
    }
};

export default WSocketReducer;
