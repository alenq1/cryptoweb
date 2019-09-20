import React, { useState, useEffect } from 'react'
import { conn } from '../services/apisources'
import { connect } from 'react-redux'
import { getApiData, setSort, getChartData } from '../actions/apiData'
import { ConnectWS } from '../actions/websocket'
import { rawData, sortData } from '../selectors/sortData';
import Tables from '../components/Tables'
import Minichart from '../components/Minichart'
import rawdata from '../data.json'
import klinedata from '../kline4h.json'
import coindata from '../coins.json'
import ModalCrypto from '../components/ModalCrypto';
import axios from 'axios';


const style = {

  // backgroundColor: 'white',
  // color: 'whitesmoke'
}


// const mapStateToProps = (state) => {

//   return {
//     //apiData: state.apiDataReducer.apiData
//     apiData: sortData(state)


//   }
// }


const Home = (props, { apiData }) => {

  console.log(props, "PRPOS EN HOME PARA CUASROS")

  //const initialData = JSON.parse(localStorage.getItem('apiData'))

  const [data, showData] = useState([{}])
  const [modal, showModal] = useState(false)
  const [crypto, showCrypto] = useState('')
  //const [apiData, setApidata] = useState(initialData)
  const [sortBy, SetSort] = useState(
    {
      marketCap: false,
      pctChange: false,
      price: false
    })


  const detailCrypto = (cryptopar) => {
    showModal(!modal)
    showCrypto(cryptopar)
  }

  const handleHide = () => {

    showModal(!modal)
  }


  //let top = data.filter( symbols => (symbols.s === 'BTCUSDT' || symbols.s === 'ET'))

  useEffect(() => {

    //   conn.onopen = function(evt) {
    //   // send Subscribe/Unsubscribe messages here (see below)
    //   //conn.send(JSON.stringify({ method: "subscribe", topic: "allTickers", symbols: ["$all"] }));
    //   //conn.send(JSON.stringify({ stream: "!miniTicker", data: "@arr"}));
    //   }
    //   conn.onmessage = function(evt) {
    //       //console.info('received data', JSON.parse(evt.data));
    //       showData(JSON.parse(evt.data))
    //   };
    //   conn.onerror = function(evt) {
    //       console.error('an error occurred', evt.data);
    //   };
    //   conn.onclose = function(evt) {
    //     console.info('close', evt);
    //     conn.send(JSON.stringify({ method: "close" }));
    // }; 

    /////setInterval(fetchData('https://api.coinranking.com/v1/public/coins'), 5000)
    //setInterval( () => {fetchData('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')}, 5000)
    //setInterval( () => {fetchData('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD')}, 10000)      
    //fetchData('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD')
    props.getApiData()
    props.ConnectWS('ws://192.168.0.2:9000/ws/test')


    //      console.log(apiData, "APIDATA VACIAAAAAA??????????")
  },

    [])





  return (
    <div>
      <center>



        <Minichart
        //data={rawdata} klinedata={klinedata} 
        //apiData={!props.apiData? initialData : props.apiData}
        />

        <h2 className="m-5">Chart data</h2>
        <Tables
          //data={rawdata}
          //wsconnect={conn}
          detailCrypto={detailCrypto}
        //getChartData={getChartData}
        //coindata={coindata}
        //apiData={!props.apiData? initialData : props.apiData}
        //Sorted={Sorted}
        />
        <ModalCrypto
          modal={modal}
          showModal={showModal}
          symbol={crypto.symbol}
          lastPrice={crypto.lastPrice}

        />

      </center>
    </div>
  );
}

export default connect(null, { getApiData, ConnectWS })(Home)
