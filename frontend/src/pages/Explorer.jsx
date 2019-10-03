import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Table, Alert } from 'react-bootstrap';


const Explorer = (props) => {

  const [data, setData] = useState([])

  //console.log(typeof (props.data), "DATA PARA EXPLORER")

  return (
    <div className='col-lg-12 col-sm-12  align-content-center p-5'>
      <h1 className="m-5">Crypto Explorer Data</h1>

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
              <th>PoW</th>
              <th>PoS</th>
              <th>height</th>
              <th>diff</th>
              <th>supply</th>
              <th>ticker</th>
            </tr>
          </thead>
          <tbody
            style={{
              color: props.txtColor,
              textAlign: 'center',
              backgroundColor: props.color === 'black' ? '#232526' : 'white'
            }}>

            {Object.keys(props.data).map((line, index) => (
              <tr>
                <td>{props.data[line].name}</td>
                <td>{props.data[line].PoW}</td>
                <td>{props.data[line].PoS}</td>
                <td>{props.data[line].height}</td>
                <td>{props.data[line].diff}</td>
                <td>{props.data[line].supply}</td>
                <td>{props.data[line].ticker.btc}</td>
              </tr>
            ))

            }
          </tbody>
        </Table>
      }
    </div >

  )

}


const mapStateToProps = state => {
  return {
    data: state.WSocket.wsData[0].explorerInfo,
    color: state.theme.theme.color,
    txtColor: state.theme.theme.textColor
  };
};

const mapDispatchToProps = dispatch => ({

  //clearSortParams: bindActionCreators(actions.clearSortParams, dispatch),
  //getChartData: (symbol, limit) => dispatch(getChartData(symbol, limit))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explorer);

