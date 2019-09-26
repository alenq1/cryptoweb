import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap';


const xChange = (props) => {

  //const [data, setData] = useState([])

  console.log(props.data, "DATA PARA EXCHANGE")
  return <div>
    <h1 className="m-5 align-content-center">Crypto Exchanges Data</h1>
    {!props.data ?
      <h1>NODATA</h1>
      :
      <Table>
        <thead style={{ color: props.txtColor }}>
          <tr>
            <th>name</th>
            <th>Active</th>
            <th>WebStatus</th>
            <th>ApiStatus</th>
            <th>website</th>
            <th>currencies</th>
            <th>markets</th>
          </tr>
        </thead>
        <tbody style={{ color: props.txtColor }}>
          {props.data.map((line, index) => (
            <tr>
              <td>{line.name}</td>
              <td>{line.active}</td>
              <td>{line.website_status}</td>
              <td>{line.api_status}</td>
              <td>{line.links.website}</td>
              <td>{line.currencies}</td>
              <td>{line.markets}</td>
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
    data: state.WSocket.wsData[0].exchangeData,
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
)(xChange);

