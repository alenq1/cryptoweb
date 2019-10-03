

export const WServer = 'ws://192.168.1.4/ws/test'
export const UrlApiImage = 'https://www.cryptocompare.com/'
export const UrlApiCoin = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD'
export const ApiNews = 'api/news/'
export const ApiWallets = 'api/wallets/'
export const ApiExplorer = 'http://chainz.cryptoid.info/explorer/api.dws?q=summary/'
export const Themes = {

        light: {
                color: 'whitesmoke',
                textColor: 'black',
                image: require("../layout/imgs/crypto8.png"),


        },

        dark: {
                color: 'black',
                textColor: 'white',
                image: require("../layout/imgs/crypto7.jpg"),
        }

}

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