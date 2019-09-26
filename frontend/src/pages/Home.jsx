import React, { useState, useEffect } from 'react'
import { conn } from '../services/apisources'
import { connect } from 'react-redux'
import { getApiData, setSort, getChartData } from '../actions/apiData'
import { ConnectWS } from '../actions/websocket'
import { rawData, sortData } from '../selectors/sortData';
import Tables from '../components/Tables'
import Minichart from '../components/Minichart'
import ModalCrypto from '../components/ModalCrypto';
import { WhisperSpinner } from "react-spinners-kit";


const Home = (props, { apiData }) => {

  console.log(props, "PRPOS EN HOME PARA CUASROS")

  //const initialData = JSON.parse(localStorage.getItem('apiData'))


  const [modal, showModal] = useState(false)
  const [crypto, showCrypto] = useState('')
  //const [apiData, setApidata] = useState(initialData)

  const detailCrypto = (cryptopar) => {
    showModal(!modal)
    showCrypto(cryptopar)
  }

  const handleHide = () => {

    showModal(!modal)
  }


  //let top = data.filter( symbols => (symbols.s === 'BTCUSDT' || symbols.s === 'ET'))

  useEffect(() => {


    //setInterval( () => {fetchData('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD')}, 10000)      

    //props.getApiData()
    props.ConnectWS('ws://192.168.0.2/ws/test')


    //      console.log(apiData, "APIDATA VACIAAAAAA??????????")
  },

    [])


  return (

    <div>
      {props.status === 'connecting' || props.status === 'connected' ?
        <center>
          <h1 className='mt-5'>Loading...</h1>
          <WhisperSpinner
            size='500'
            color="#686769"
            loading='true'
            frontColor="#386769"
            backColor="#646459"
            className="mt-5"
          />
        </center>
        :
        <center>
          <Minichart />

          <h2 className="m-5">Top 100 Crypto</h2>
          <Tables
            detailCrypto={detailCrypto}
          />
          <ModalCrypto
            modal={modal}
            showModal={showModal}
            symbol={crypto.symbol}
            lastPrice={crypto.lastPrice}

          />

        </center>
      }
    </div>
  );
}

const mapStateToProps = state => {
  return {
    status: state.WSocket.status,
    //txtColor: state.theme.theme.textColor
  }
}

export default connect(mapStateToProps, { getApiData, ConnectWS })(Home)
