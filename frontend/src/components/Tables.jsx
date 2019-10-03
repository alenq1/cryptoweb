import React from 'react';
import { Linecharts, Line2, Line3, Line4, Line5, Line6 } from './Cryptocharts';
import { connect } from 'react-redux';
import { UrlApiImage } from '../services/apisources';
import { getApiData, getChartData } from '../actions/apiData';
import { setSort } from '../actions/sort';
import { sortData } from '../selectors/sortData';
import { Table } from 'react-bootstrap'

const stythtd = {
  padding: '20px',
  borderColor: 'black'
};

const Tables = (props, { color, textColor, apiDatas, apiData }) => {

  //console.log(props.apiDatas, "APIDATAA DE SELECTORRRRRRRRRRRR")


  const showDetail = symbol => {

    //console.log('LOL APRETADO con', symbol);
    //props.getChartData(symbol, 10);

    props.detailCrypto(symbol);
  };

  return (
    <React.Fragment>
      <div className="col-lg-11 col-sm-11">
        <Table responsive
          borderless
          hover
          striped
          className='m-auto p-lg-4 m-sm-auto p-4'
        >
          <thead
            style={{ background: 'linear-gradient(to right, #000428, #004e92)', color: 'white' }}>
            <tr style={{ textAlign: 'center' }}>
              <th style={{ ...stythtd }}>Rank</th>
              <th style={{ ...stythtd, textAlign: 'left' }}>Name</th>
              <th style={stythtd} onClick={() => props.setSort('price')}>
                Last Price
            </th>
              <th style={stythtd} onClick={() => props.setSort('pctChange')}>
                % Change
            </th>
              <th style={stythtd} onClick={() => props.setSort('marketCap')}>
                Market Cap
            </th>
              <th style={stythtd}>Circulating Supply</th>
              <th style={stythtd}>24h Volume</th>
            </tr>
          </thead>
          <tbody
            style={{
              color: props.textColor,
              textAlign: 'left',
              backgroundColor: props.color === 'black' ? '#232526' : 'whitesmoke'
            }}>
            {!props.apiDatas[0].CoinInfo
              ? 0
              : props.apiDatas.map((coin, index) => (
                <tr
                  style={{ padding: '2em' }}
                  key={index}
                  onClick={() => showDetail(coin)}>
                  <td style={{ ...stythtd, overflowY: 'auto' }}>{index + 1} </td>
                  <td style={{ ...stythtd, textAlign: 'left', overflowY: 'auto' }}>
                    <img
                      src={`${UrlApiImage}${coin.CoinInfo.ImageUrl}`}
                      height='20px'
                      width='20px'
                      className='mr-3'
                    />
                    {coin.CoinInfo.FullName} {coin.CoinInfo.Name}
                  </td>
                  <td style={stythtd}>{coin.DISPLAY.USD.PRICE}</td>
                  <td
                    style={coin.RAW.USD.CHANGEPCT24HOUR > 0 ? { color: "#1DAC22" } : { color: "red" }}
                  >
                    {coin.DISPLAY.USD.CHANGEPCT24HOUR} %
                  </td>
                  <td style={{ ...stythtd, textAlign: 'left' }}>
                    {coin.DISPLAY.USD.MKTCAP}{' '}
                  </td>
                  <td style={{ ...stythtd, textAlign: 'left' }}>
                    {coin.DISPLAY.USD.SUPPLY}
                  </td>
                  <td style={{ ...stythtd, textAlign: 'left' }}>
                    {coin.DISPLAY.USD.VOLUME24HOUR}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </React.Fragment >
  );
};

const mapStateToProps = state => {
  return {
    apiDatas: sortData(state),
    color: state.theme.theme.color,
    textColor: state.theme.theme.textColor
  }
}

const mapDispatchToProps = dispatch => ({
  setSort: sortkey => dispatch(setSort(sortkey)),
  getChartData: (symbol, limit) => dispatch(getChartData(symbol, limit)),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tables);
