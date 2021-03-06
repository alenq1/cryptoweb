import {
  GET_DATA,
  ERROR_GET,
  GET_NEWS,
  ERROR_GET_NEWS,
  LOADING_FETCH,
  GET_LATEST,
  LOADING_CHART,
  CHART_READY,
  ERROR_GET_CHART,
  LOADING_WALLETS,
  GET_WALLETS,
  ERROR_GET_WALLETS,
  LOADING_EXPLORER,
  GET_EXPLORER,
  ERROR_GET_EXPLORER,
} from '../constants/action-types'
import axios from 'axios'
import adapter from 'axios/lib/adapters/http'
import { UrlApiCoin, ApiNews, ApiWallets, ApiExplorer } from '../services/apisources'


export const getApiData = () => dispatch => {

  if (localStorage.getItem('apiData') === null) {

    console.log(localStorage.getItem('apiData'))

    axios(
      UrlApiCoin
    )
      .then(data => {
        dispatch({ type: GET_DATA, payload: data.data.Data })
        localStorage.setItem('apiData', JSON.stringify(data.data.Data))
      })
      .catch(error => {
        console.log(error, 'ERROR APIDATA')
        dispatch({ type: ERROR_GET, payload: error })
      })
  } else {
    dispatch({
      type: GET_DATA,
      payload: JSON.parse(localStorage.getItem('apiData'))
    })
  }
}

export const getApiNews = () => dispatch => {

  dispatch({ type: LOADING_FETCH })

  axios(ApiNews)
    .then(data => {
      if (!data.data['error']) {
        dispatch({ type: GET_NEWS, payload: data.data })
        localStorage.setItem('newsData', JSON.stringify(data.data))
      }
    })

    .catch(error => {
      console.log(error, 'ERROR NEWSDATA')
      dispatch({ type: ERROR_GET_NEWS, payload: error })
    })
}

export const getLatest = (site, keyword) => dispatch => {
  console.log(site, keyword, 'PETICON PARA BUSCAR')

  dispatch({ type: LOADING_FETCH })
  axios.post(
    ApiNews,
    {
      searchsite: site,
      keyword
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

    .then(data => {
      dispatch({ type: GET_LATEST, payload: data.data })
      localStorage.setItem('latestnews', JSON.stringify(data.data))
    })
    .catch(error => {
      console.log(error, 'ERROR APIDATA')
      dispatch({ type: ERROR_GET_NEWS, payload: error })
    })
}

///////////////////////
export const getChartData = (topsymbol, limit, timechart) => dispatch => {

  const localChartData = JSON.parse(localStorage.getItem('chartdata'))

  //console.log(localChartData, 'valor de localstroare data')
  //console.log(timechart, "PARAEJECUTAR EB CONSUTA API CHART")

  if (!localChartData) {

    //  console.log('ME JECUTO APIDATA')

    const promises = []

    console.log((topsymbol, limit), 'PETICON PARA CHART')
    dispatch({ type: LOADING_CHART })


    console.log(topsymbol, 'TOPSYMBOL LIST')

    if (topsymbol && topsymbol !== null) {
      let chartData = []
      console.log('ahora antes de ahcer los fetchs')
      topsymbol.map(async symbols => {
        promises.push(
          axios.get(
            `https://min-api.cryptocompare.com/data/histo${timechart}?fsym=${symbols}&tsym=USD&limit=${limit}`
          )
        )
      })
      axios
        .all(promises)
        .then(data => {
          //data.data.Data['symbol'] = symbols
          console.log(data, 'RESUKTADO TOTAL GLOBAL')
          console.log(topsymbol.length, 'ARRAY SYMBOLO')
          for (let i = 0; i < topsymbol.length; i++) {
            chartData.push({
              time: timechart,
              symbol: topsymbol[i],
              finaldata: data[i].data.Data
            })
          }
          dispatch({
            type: CHART_READY,
            payload: chartData
          })
          console.log(chartData, 'PARA GUARDAR EN LOCALSTORAGE')
          localStorage.setItem('chartdata', JSON.stringify(chartData))
        })

        .catch(error => {
          console.log(error, 'ERROR APIDATA')
          dispatch({ type: ERROR_GET_CHART, payload: error })
        })
    } else {
      dispatch({ type: ERROR_GET_CHART, payload: 'error al cargar' })
    }
  } else {
    console.log('me ejecuto YO ALFINAL  de APIDATa')
    dispatch({
      type: CHART_READY,
      payload: JSON.parse(localStorage.getItem('chartdata'))
    })
  }
}

export const getWallets = () => dispatch => {

  dispatch({ type: LOADING_WALLETS })

  axios(ApiWallets)
    .then(data => {
      if (!data.data['error']) {
        dispatch({ type: GET_WALLETS, payload: data.data })
        localStorage.setItem('walletsData', JSON.stringify(data.data))
      }
    })

    .catch(error => {
      console.log(error, 'ERROR WALLETSDATA')
      dispatch({ type: ERROR_GET_WALLETS, payload: error })
    })
}

export const getExplorers = () => dispatch => {

  dispatch({ type: LOADING_EXPLORER })

  axios(ApiExplorer)
    .then(data => {

      dispatch({ type: GET_EXPLORER, payload: data.data })

      localStorage.setItem('explorerData', JSON.stringify(data.data))

    })

    .catch(error => {
      console.log(error, 'ERROR EXPLORERDATA')
      dispatch({ type: ERROR_GET_EXPLORER, payload: error })
    })
}
