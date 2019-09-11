
//export const conn = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");
    
    //const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
   

//export const customconn = new WebSocket(`wss://stream.binance.com:9443/stream?streams=btcusdt@kline_4h`) 

export const apiKeys = {

        coinmarket: 'b9a85acc-c37a-453d-ab54-ec1e9e0e9f92',
        cryptocompare: 'f58c657e5cc22ea83a0d2c759e6e4a7ff172e92716e603aff9d3b5eeec2076ac'

}

export const sources = [
        {
         getAction: 'crypto table data',
         url: 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD',
         method: 'GET',
         data: '',
         headers: ''
        }

]