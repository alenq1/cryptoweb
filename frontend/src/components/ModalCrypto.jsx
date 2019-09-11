import React from 'react'
import {Modal, Button } from 'react-bootstrap'
import Linecharts, {Line2, Line3, Line4, Line5, Line6} from './Cryptocharts'

const style = {

    backgroundColor: 'black',
    color: 'whitesmoke',
  }


const ModalCrypto = (props) => {
    return (
        <div>
            <Modal show={props.modal} onHide={() => props.showModal(false)}>
            <Modal.Header style={style} closeButton>
              <Modal.Title>{props.symbol}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={style}>{props.lastPrice}
            <Linecharts/>
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

export default ModalCrypto

