import {
    WEBSOCKET_CONNECT, WEBSOCKET_CONNECTING, WEBSOCKET_CONNECTED,
    WEBSOCKET_MESSAGE, WEBSOCKET_DISCONNECT, WEBSOCKET_DISCONNECTED
} from '../constants/action-types'



export const ConnectWS = (wsUrl) => dispatch => {


    dispatch({ type: WEBSOCKET_CONNECTING })

    let testWSURL = "ws://ws/"
    let wsconn = new WebSocket(testWSURL)

    wsconn.onopen = function (event) {

        dispatch({ type: WEBSOCKET_CONNECTED, payload: event.data })
        //   // send Subscribe/Unsubscribe messages here (see below)
        //   //wsconn.send(JSON.stringify({ method: "subscribe", topic: "allTickers", symbols: ["$all"] }));
        //   //wsconn.send(JSON.stringify({ stream: "!miniTicker", data: "@arr"}));

    }
    wsconn.onmessage = function (event) {
        //       //console.info('received data', JSON.parse(event.data));
        dispatch({ type: WEBSOCKET_MESSAGE, payload: event.data })
        //       showData(JSON.parse(event.data))
    }
    wsconn.onerror = function (event) {
        //       console.error('an error occurred', event.data);
        dispatch({ type: WEBSOCKET_MESSAGE, payload: event.data })
    }

    wsconn.onclose = function (event) {
        //     console.info('close', event);
        //     wsconn.send(JSON.stringify({ method: "close" }));
        dispatch({ type: WEBSOCKET_DISCONNECTED, payload: event.data })
    }
}