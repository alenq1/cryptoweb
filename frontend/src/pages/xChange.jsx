import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { UrlApiImage } from '../services/apisources'
import { Table, Button, ProgressBar, Alert } from 'react-bootstrap';
import Rating from 'react-rating';
import {
  TiStarFullOutline, TiStarOutline
} from 'react-icons/ti'



const xChange = (props) => {

  console.log(props.data, "DATA PARA EXCHANGE")


  return (

    <div className='col-lg-12 col-sm-12  align-content-center p-5'>
      <h1 className="m-5">Crypto Exchanges Data</h1>

      {!props.data ?
        <Alert className='align-content-center' variant='danger'>
          <b>ERROR</b><p>Loading Data Error</p>
        </Alert>
        :
        <Table responsive
          borderless
          hover
          striped
          className='m-auto p-lg-4 m-sm-auto p-4'
        >
          <thead style={{ background: 'linear-gradient(to right, #000428, #004e92)', color: 'white' }}>
            <tr>
              <th>name</th>
              <th>Type</th>
              <th>Grade</th>
              <th>Vol 24h</th>
              <th>OrderBook</th>
              <th>Rating</th>
              <th>Url</th>
            </tr>
          </thead>
          <tbody
            style={{
              color: props.textColor,
              backgroundColor: props.color === 'black' ? '#232526' : 'white'
            }}
          >
            {Object.keys(props.data).map((line, index) => (
              <tr>
                <td style={{ textAlign: 'Left' }}><img src={`${UrlApiImage}${props.data[line].LogoUrl}`}
                  height="50"
                  width='50'
                  className="ml-5 mr-5"
                /> {props.data[line].Name}</td>
                <td>{props.data[line].CentralizationType}</td>
                <td>{props.data[line].Grade} <ProgressBar animated now={props.data[line].GradePoints} /></td>
                <td>{props.data[line].TOTALVOLUME24H.BTC}</td>
                <td>{props.data[line].OrderBook}</td>
                <td><Rating initialRating={props.data[line].Rating.Avg}
                  emptySymbol={<h6><TiStarOutline /></h6>}
                  fullSymbol={<h6><TiStarFullOutline /></h6>
                  } /></td>
                <td><a href={props.data[line].AffiliateURL}><Button>Link</Button></a></td>
              </tr>
            ))

            }
          </tbody>
        </Table>
      }

    </div>)

}

const mapStateToProps = state => {
  return {
    data: state.WSocket.wsData[0].exchangeData.Data,
    color: state.theme.theme.color,
    textColor: state.theme.theme.textColor
  };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(xChange);