import React, { useState, useEffect } from 'react'
import { conn } from '../services/apisources'
import { connect } from 'react-redux'
import { getApiData, setSort, getChartData } from '../actions/apiData'
import { ConnectWS } from '../actions/websocket'
import Tables from '../components/Tables'
import Minichart from '../components/Minichart'
import ModalCrypto from '../components/ModalCrypto';
import { WhisperSpinner } from "react-spinners-kit";


const Home = (props) => {

  //console.log(props, "PRPOS EN HOME PARA CUASROS")

  //const initialData = JSON.parse(localStorage.getItem('apiData'))


  const [modal, showModal] = useState(false)
  const [crypto, showCrypto] = useState('')

  const detailCrypto = (cryptopar) => {
    console.log(cryptopar, "PARA PASAR A MODAL");
    showModal(!modal)
    showCrypto(cryptopar)
  }

  return (

    <div>
      {props.status === 'connecting' || props.status === 'connected' ?
        <center>
          <h1 className='mt-5 p-5'>Loading...</h1>
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
            info={crypto}
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