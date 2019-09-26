import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap';


const Explorer = (props) => {

  const [data, setData] = useState([])

  console.log(typeof (props.data), "DATA PARA EXPLORER")
  return <div>
    <h1 className="m-5 align-content-center">Crypto Explorer Data</h1>
    {!props.data ?
      <h1>NODATA</h1>
      :
      <Table>
        <thead style={{ color: props.txtColor }}>
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
        <tbody style={{ color: props.txtColor }}>
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




  </div>
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

