import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { WhisperSpinner } from 'react-spinners-kit'
import { getChartData } from '../actions/apiData';
import { TopCharts } from '../selectors/TopCharts';
import { connect } from 'react-redux';
//import {Card} from 'react-bootstrap'
import { Line2 } from './Cryptocharts';
import { FaRegCaretSquareDown } from 'react-icons/fa';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

const mapStateToProps = state => {
  return {
    cryptoCharts: TopCharts(state),
    //datanews: state.news.datanews,
    //loadingrx: state.newsReducer.loading,
    chartData: state.chart.chartData,
    loadingch: state.chart.loadingch,
    //error: state.news.error,
    //latestnews: state.news.latestnews
    theme: state.theme.theme
  };
};

const mapDispatchToProps = dispatch => ({
  getChartData: (topsymbol, limit) => dispatch(getChartData(topsymbol, limit))
  //getLatest: (site) => dispatch(getLatest(site))
  //clearSortParams: bindActionCreators(actions.clearSortParams, dispatch)
});

const BaseCharts = ({
  getChartData,
  cryptoCharts,
  chartData,
  loadingch,
  theme
}) => {
  useEffect(() => {

    console.log(cryptoCharts, 'LISTADO DE COINS A BUSKAR ');

    getChartData(cryptoCharts, 10);
  }, []);

  console.log(chartData, 'DATA VOY A PASAR LOS RESULTADOS A CHART');
  return (
    <center>
      <h1 className='m-5'>Top Crtpto Charts</h1>
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
        ) : (
              chartData.map((data, index) => (
                <Card
                  className='col-3 p-1 m-5 bg-dark text-white'
                  key={data.time + index}>
                  <p>{data.time}</p>
                  <p>{data.symbol}</p>
                  <Line2 data={data.finaldata} />
                </Card>
              ))
            )}
      </div>
    </center>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseCharts);
