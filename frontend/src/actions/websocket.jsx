import {
    WEBSOCKET_CONNECT, WEBSOCKET_CONNECTING, WEBSOCKET_CONNECTED,
    WEBSOCKET_MESSAGE, WEBSOCKET_DISCONNECT, WEBSOCKET_DISCONNECTED,
    WEBSOCKET_ERROR
} from '../constants/action-types'


export const ConnectWS = (wsUrl) => dispatch => {

    console.log(wsUrl, 'PREPARO COENXION A WS');

    dispatch({ type: WEBSOCKET_CONNECTING })

    let wsconn = new WebSocket(wsUrl)

    wsconn.onopen = function (event) {


        //console.log("CONECTADO WSSSSSSS");
        wsconn.send(JSON.stringify({ message: 'CONNECTED FROM FRONTEND' }));
        dispatch({ type: WEBSOCKET_CONNECTED, payload: event.data })
        //   // send Subscribe/Unsubscribe messages here (see below)



    }
    wsconn.onmessage = function (event) {

        console.log("MENSAGE RECIBIDO WSSSSSSS");
        dispatch({
            type: WEBSOCKET_MESSAGE,
            payload: {
                'cryptoData': JSON.parse(event.data).message.cryptoData.Data,
                'explorerInfo': JSON.parse(event.data).message.explorerInfo,
                'exchangeData': JSON.parse(event.data).message.exchangeData
            }
        })

        localStorage.setItem('apiData', JSON.stringify(JSON.parse(event.data).message.cryptoData.Data))
        localStorage.setItem('othData', JSON.stringify(JSON.parse(event.data).message))

    }

    wsconn.onerror = function (event) {

        //console.log("ERRROR DE WSSSSSSS");

        dispatch({ type: WEBSOCKET_ERROR, payload: event.data })
    }

    wsconn.onclose = function (event) {

        //console.log("DESCONECTADO WSSSSSSS");
        dispatch({ type: WEBSOCKET_DISCONNECTED, payload: event.data })
    }
}