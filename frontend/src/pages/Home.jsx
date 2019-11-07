import React, { useState, useEffect } from 'react'
import { conn } from '../services/apisources'
import { connect } from 'react-redux'
import { getApiData, setSort, getChartData } from '../actions/apiData'
import { ConnectWS } from '../actions/websocket'
import Tables from '../components/Tables'
import Minichart from '../components/Minichart'
import ModalCrypto from '../components/ModalCrypto';
import Loader from '../components/Loader'
import {FaAngleDoubleDown} from 'react-icons/fa'
import Jump from 'react-reveal/Jump'



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
        <Loader/>
        :
        <center>
          <Minichart />

          <div className="m-5" 
          style={{
            background: props.theme.color === 'white' &&
              'linear-gradient(to bottom, #ada996, #f2f2f2, #dbdbdb, #eaeaea)',
            color: props.theme.textColor, 
            borderColor: '#000000',
            borderBlockColor: '#000000',
            width: '20%',
            
            
          }}
          >
           
          
          <h4>Top 100 Crypto</h4>
          <div className='mt-4'>
          <Jump top forever={true} duration={4000}>
          <FaAngleDoubleDown size='2em'/>
          
          </Jump>
          </div>
          </div>
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
    theme: state.theme.theme
  }
}

export default connect(mapStateToProps, { getApiData, ConnectWS })(Home)