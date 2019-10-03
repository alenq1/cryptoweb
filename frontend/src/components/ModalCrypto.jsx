import React from 'react'
import { Modal, Button, Table } from 'react-bootstrap'
import Linecharts, { Line2, Line3, Line4, Line5, Line6 } from './Cryptocharts'
import { connect } from 'react-redux'
import { UrlApiImage } from '../services/apisources'




const ModalCrypto = (props) => {

  const style = {

    background: props.theme.color,
    color: props.theme.textColor,
    th: {
      background: 'linear-gradient(to right, #000428, #004e92)',
      color: 'white'

    },
    td: {
      color: props.theme.textColor === 'white' ? 'white' : 'black',
      textAlign: 'left',
      backgroundColor: props.theme.color === 'black' ? 'black' : '#f5f4f8'

    },
  }

  //console.log(props, "INFO PARA EL MODAL");

  return (
    <div>
      <Modal show={props.modal} onHide={() => props.showModal(false)} centered size="lg">
        <Modal.Header closeButton style={style}>
          <Modal.Title>{props.info && props.info.CoinInfo.FullName ?
            <>

              <span className="ml-auto"><img
                src={`${UrlApiImage}${props.info.CoinInfo.ImageUrl}`}
                height='45px'
                width='45px'
                className='mr-3'
              />{props.info.CoinInfo.FullName}</span>
              <span className='ml-5 pl-5' style={
                props.info.RAW.USD.CHANGEPCTDAY > 0
                  ? { color: '#39FF33' }
                  : { color: 'red' }
              }>{props.info.DISPLAY.USD.CHANGEPCTDAY} %</span>
            </>
            : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={style}>
          <div className="row mt-5">

            {props.info && props.info.DISPLAY ?
              <div className='col-6'>
                <Table responsive
                  hover
                  striped
                  style={{
                    color: props.theme.textColor,
                    textAlign: 'left',
                    backgroundColor: props.theme.color === 'black' ? '#232526' : 'white'
                  }}
                >
                  <tr>
                    <th style={style.th}>Current Price</th><td colSpan='3'><h3><center>{props.info.DISPLAY.USD.PRICE}</center></h3></td>
                  </tr>
                  <tr>
                    <th style={style.th}>Open Day</th><td>{props.info.DISPLAY.USD.OPENDAY}</td>

                    <th style={style.th}>High Day</th><td>{props.info.DISPLAY.USD.HIGHDAY}</td>
                  </tr>
                  <tr>
                    <th style={style.th}>Low Day</th><td>{props.info.DISPLAY.USD.LOWDAY}</td>

                    <th style={style.th}>Volume Day</th><td>{props.info.DISPLAY.USD.VOLUMEDAY}</td>
                  </tr>
                  <tr>
                    <th style={style.th}>Block Number</th><td>{props.info.CoinInfo.BlockNumber}</td>
                    <th style={style.th}>Market Source</th><td>{props.info.DISPLAY.USD.LASTMARKET}</td>
                  </tr>
                </Table>
              </div>
              :
              ''
            }
            <div className='col-6'>
              <Linecharts />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={style}>
          <Button variant="info" onClick={() => props.showModal(false)}>
            Back
              </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

const mapStateToProps = state => {
  return {
    theme: state.theme.theme
  }
}

const mapDispatchToProps = dispatch => ({

});



export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (ModalCrypto);

