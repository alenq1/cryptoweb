import React from 'react';
import { Linecharts, Line2, Line3, Line4, Line5, Line6 } from './Cryptocharts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getApiData, getChartData } from '../actions/apiData';
import { setSort } from '../actions/sort';
import { sortData } from '../selectors/sortData';
import { Table } from 'react-bootstrap'

const stythtd = {
  padding: '20px',
  borderColor: 'black'
};

const Tables = (props, { color, txtColor, apiDatas, apiData }) => {

  //console.log(props.coindata.data, "COINDATA")
  //console.log(props, "TODAS PROPS EN TABLLLLLAAAAAAA")
  //console.log(props.apiData, "PROPS EN TABALAS")
  //console.log(props.apiDatas, "APIDATAA DE SELECTORRRRRRRRRRRR")
  //props.data.sort((a, b) => b.c - a.c)

  const showDetail = symbol => {
    console.log('LOL APRETADO con', symbol);
    //props.getChartData(symbol, 10);
    props.detailCrypto([symbol.name]);
  };
  //props.apiData ? props.apiData.sort((a, b) => b.RAW.USD.MKTCAP - a.RAW.USD.MKTCAP) : null
  console.log(props.apiDatas, 'PARA PINTAr EN tABLAS');

  return (
    <React.Fragment>
      <div className="col-lg-11 col-sm-11">
        <Table responsive
          borderless
          hover
          striped
          className='m-auto p-lg-4 m-sm-auto p-4'
          variant='dark'>
          <thead
            style={{ background: 'linear-gradient(to right, #23074d, #cc5333', color: txtColor, }}>
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
              color: props.txtColor === 'whitesmoke' ? 'whitesmoke' : 'black',
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
                      src={`https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`}
                      height='20px'
                      width='20px'
                      className='mr-3'
                    />
                    {coin.CoinInfo.FullName} {coin.CoinInfo.Name}
                  </td>
                  <td style={stythtd}>{coin.DISPLAY.USD.PRICE}</td>
                  <td
                    style={
                      coin.RAW.USD.CHANGEPCT24HOUR > 0
                        ? { ...stythtd, color: '#39FF33' }
                        : { ...stythtd, color: 'red' }
                    }>
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
    txtColor: state.theme.theme.textColor
  };
};

const mapDispatchToProps = dispatch => ({
  setSort: sortkey => dispatch(setSort(sortkey)),
  //clearSortParams: bindActionCreators(actions.clearSortParams, dispatch),
  getChartData: (symbol, limit) => dispatch(getChartData(symbol, limit))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tables);
