import React, { useState, useEffect } from 'react';
import { WhisperSpinner } from 'react-spinners-kit'
import { getChartData } from '../actions/apiData';
import { TopCharts } from '../selectors/TopCharts';
import { connect } from 'react-redux';
//import {Card} from 'react-bootstrap'
import { Line2 } from './Cryptocharts';
import { FaRegCaretSquareDown } from 'react-icons/fa';
import Card from '@material-ui/core/Card';
import { red } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const BaseCharts = ({
  getChartData,
  cryptoCharts,
  chartData,
  loadingch,
  theme
}) => {

  const [value, setValue] = useState(0);
  const [tmpdata, setTempData] = useState('')

  const handleChange = (event, newValue) => {
    console.log(newValue, 'VALOR PARA BOTOTN DE CHARTS');
    localStorage.removeItem('chartdata')
    getChartData(cryptoCharts, 10, newValue);

    setValue(newValue);
  };


  useEffect(() => {

    //console.log(cryptoCharts, 'LISTADO DE COINS A BUSKAR ');

    getChartData(cryptoCharts, 10, 'day');

  }, []);



  //console.log(chartData, 'DATA VOY A PASAR LOS RESULTADOS A CHART');

  return (

    <>
      <h1 className='m-5 shadow-lg w-25 center-block' style={{ background: theme.color }}>Top Crtpto Charts</h1>
      <AppBar position="static"
        style={{
          background: theme.color === 'black' ? 'linear-gradient(to bottom, #232526, #414345)'
            : 'linear-gradient(to bottom, #ada996, #f2f2f2, #dbdbdb, #eaeaea)',
          color: theme.textColor
        }}>
        <Tabs value={chartData[0] ? chartData[0].time : 'day'}
          onChange={handleChange}
          variant='standard'
          centered='true'>
          <Tab label="Day" value='day' style={{ color: theme.textColor }} />
          <Tab label="Hour" value='hour' style={{ color: theme.textColor }} />
          <Tab label="Minute" value='minute' style={{ color: theme.textColor }} />
        </Tabs>
      </AppBar>
      <div className='row p-3 m-3'>
        {loadingch ? (
          <center>

            <h1 className='mt-5'>Loading...</h1>
            <WhisperSpinner
              size='500'
              color="#686769"
              loading='true'
              frontColor="#386769"
              backColor="#646459"
              className="mt-5"
            />
          </center>
        ) : !chartData ? (
          <p>ERROR</p>
        ) :

            (


              chartData.map((data, index) => (
                <Card
                  className='col-lg-3 col-sm-9 p-1 m-5'
                  style=
                  {{
                    background: theme.color === 'black' ? 'linear-gradient(to bottom, #232526, #414345)'
                      : 'linear-gradient(to bottom, #ada996, #f2f2f2, #dbdbdb, #eaeaea)',
                    color: theme.textColor
                  }}
                  key={data.time + index}>

                  <p>{data.symbol}</p>
                  <Line2 data={data.finaldata}
                    chartime={data.time}
                  />
                </Card>
              ))
            )}
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    cryptoCharts: TopCharts(state),
    //////////////// PENDING ------------------------------------coindata: state.WSdata.,
    chartData: state.chart.chartData,
    loadingch: state.chart.loadingch,
    //error: state.news.error,
    theme: state.theme.theme
  }
}

const mapDispatchToProps = dispatch => ({
  getChartData: (topsymbol, limit, timechart) => dispatch(getChartData(topsymbol, limit, timechart))

})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseCharts);
